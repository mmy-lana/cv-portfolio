import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { RetroComputer } from './retro-computer';
import { ThemeService } from '../../../services/theme.service';

describe('RetroComputer terminal command parser', () => {
  function createComponent(): RetroComputer {
    const fixture = TestBed.createComponent(RetroComputer);
    return fixture.componentInstance;
  }

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [RetroComputer],
      providers: [provideRouter([]), provideTranslateService({ fallbackLang: 'en' })],
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('starts with the system.init boot entry', () => {
    const component = createComponent();
    const history = component.history();
    expect(history.length).toBe(1);
    expect(history[0].type).toBe('system');
    expect(history[0].command).toBe('system.init');
  });

  it('records "help" as a help entry and clears the input', () => {
    const component = createComponent();
    component.inputQuery.set('help');
    component.executeCommand();
    const history = component.history();
    expect(history.length).toBe(2);
    expect(history[1].type).toBe('help');
    expect(component.inputQuery()).toBe('');
  });

  it('strips a "cat " prefix before classifying the command', () => {
    const component = createComponent();
    component.executeCommand('cat experience');
    expect(component.history()[1].type).toBe('experience');
    expect(component.history()[1].command).toBe('experience');
  });

  it('strips "ls", "run" and "get" prefixes as well', () => {
    const component = createComponent();
    component.executeCommand('ls skills');
    component.executeCommand('run education');
    component.executeCommand('get contact');
    const history = component.history();
    expect(history[1].type).toBe('skills');
    expect(history[2].type).toBe('education');
    expect(history[3].type).toBe('contact');
  });

  it('classifies unknown commands as errors', () => {
    const component = createComponent();
    component.executeCommand('nonsense-command');
    expect(component.history()[1].type).toBe('error');
    expect(component.history()[1].command).toBe('nonsense-command');
  });

  it('is case-insensitive', () => {
    const component = createComponent();
    component.executeCommand('HELP');
    expect(component.history()[1].type).toBe('help');
  });

  it('"clear" empties the terminal history', () => {
    const component = createComponent();
    component.executeCommand('about');
    expect(component.history().length).toBe(2);
    component.executeCommand('clear');
    expect(component.history().length).toBe(0);
  });

  it('ignores empty and whitespace-only input', () => {
    const component = createComponent();
    component.executeCommand('   ');
    component.executeCommand('');
    expect(component.history().length).toBe(1);
  });

  it('accumulates commands in order', () => {
    const component = createComponent();
    component.executeCommand('about');
    component.executeCommand('skills');
    component.executeCommand('download-cv');
    const history = component.history();
    expect(history.map((h) => h.type)).toEqual(['system', 'about', 'skills', 'download-cv']);
  });

  it('"download-cv" triggers a download of the CV PDF', () => {
    const clicked: string[] = [];
    const originalClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function (this: HTMLAnchorElement) {
      clicked.push(this.getAttribute('href') || '');
    };
    const component = createComponent();
    try {
      component.executeCommand('download-cv');
    } finally {
      HTMLAnchorElement.prototype.click = originalClick;
    }
    expect(clicked).toEqual(['assets/cv/CV_Muhammad_Maulana_Yusuf.pdf']);
    expect(component.history()[1].type).toBe('download-cv');
  });

  it('ngOnInit activates the retro-computer theme', () => {
    const fixture = TestBed.createComponent(RetroComputer);
    fixture.detectChanges();
    expect(TestBed.inject(ThemeService).currentTheme()).toBe('retro-computer');
  });
});
