import { Component, OnInit, signal, viewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';
import { ThemeService } from '../../../services/theme.service';

export interface TerminalEntry {
  command: string;
  type: 'help' | 'about' | 'experience' | 'skills' | 'education' | 'certificates' | 'contact' | 'download-cv' | 'error' | 'clear' | 'system';
  timestamp: string;
}

@Component({
  selector: 'app-retro-computer',
  standalone: true,
  imports: [ThemeNav, TranslateModule, RouterModule, FormsModule],
  templateUrl: './retro-computer.html'
})
export class RetroComputer implements OnInit {
  terminalContainer = viewChild<ElementRef<HTMLDivElement>>('terminalContainer');
  commandInput = viewChild<ElementRef<HTMLInputElement>>('commandInput');

  inputQuery = signal<string>('');
  history = signal<TerminalEntry[]>([
    {
      command: 'system.init',
      type: 'system',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  quickCommands = [
    'help',
    'about',
    'experience',
    'skills',
    'education',
    'certificates',
    'contact',
    'download-cv',
    'clear'
  ];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setTheme('retro-computer');
  }

  executeCommand(cmd?: string): void {
    const rawCmd = (cmd ?? this.inputQuery()).trim().toLowerCase();
    if (!rawCmd) return;

    this.inputQuery.set('');

    if (rawCmd === 'clear') {
      this.history.set([]);
      return;
    }

    const timestamp = new Date().toLocaleTimeString();
    const validCommands = ['help', 'about', 'experience', 'skills', 'education', 'certificates', 'contact', 'download-cv'];
    const type: TerminalEntry['type'] = validCommands.includes(rawCmd)
      ? (rawCmd as TerminalEntry['type'])
      : 'error';

    if (rawCmd === 'download-cv') {
      this.triggerDownload();
    }

    this.history.update(h => [...h, { command: rawCmd, type, timestamp }]);
    this.scrollToBottom();
  }

  focusInput(): void {
    this.commandInput()?.nativeElement.focus();
  }

  private triggerDownload(): void {
    const link = document.createElement('a');
    link.href = 'assets/cv/CV_Muhammad_Maulana_Yusuf.pdf';
    link.download = 'CV_Muhammad_Maulana_Yusuf.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = this.terminalContainer()?.nativeElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 50);
  }
}