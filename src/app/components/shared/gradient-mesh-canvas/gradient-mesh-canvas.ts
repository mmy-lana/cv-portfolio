import { Component, ElementRef, OnInit, OnDestroy, viewChild, NgZone, inject } from '@angular/core';

@Component({
  selector: 'app-gradient-mesh-canvas',
  standalone: true,
  template: `<canvas #meshCanvas class="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>`,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class GradientMeshCanvas implements OnInit, OnDestroy {
  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('meshCanvas');
  private ngZone = inject(NgZone);
  private animId: number | null = null;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initWebGL();
    });
  }

  ngOnDestroy(): void {
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
    }
  }

  private initWebGL(): void {
    const canvas = this.canvasRef().nativeElement;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const mouseHandler = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', mouseHandler);

    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gl.viewport(0, 0, width, height);
    };
    window.addEventListener('resize', resizeHandler);

    const vertShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        vec2 mouse = u_mouse * vec2(u_resolution.x / u_resolution.y, 1.0);
        float dist = distance(st, mouse);

        float wave1 = sin(st.x * 3.0 + u_time * 0.8 + dist * 2.0);
        float wave2 = cos(st.y * 3.5 - u_time * 0.6 + wave1 * 1.5);
        float wave3 = sin((st.x + st.y) * 2.0 + u_time * 0.5 + dist * 3.0);

        vec3 color1 = vec3(0.06, 0.04, 0.15); // Deep Indigo
        vec3 color2 = vec3(0.48, 0.22, 0.93); // Electric Purple
        vec3 color3 = vec3(0.95, 0.25, 0.37); // Coral
        vec3 color4 = vec3(0.02, 0.71, 0.83); // Cyan

        float mix1 = clamp((wave1 + 1.0) * 0.5, 0.0, 1.0);
        float mix2 = clamp((wave2 + 1.0) * 0.5, 0.0, 1.0);
        float mix3 = clamp((wave3 + 1.0) * 0.5, 0.0, 1.0);

        vec3 blended = mix(color1, color2, mix1);
        blended = mix(blended, color3, mix2 * 0.7);
        blended = mix(blended, color4, mix3 * 0.5);

        gl_FragColor = vec4(blended, 1.0);
      }
    `;

    const createShader = (glCtx: WebGLRenderingContext, type: number, source: string) => {
      const shader = glCtx.createShader(type)!;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      return shader;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertShaderSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');

    gl.viewport(0, 0, width, height);

    const startTime = performance.now();

    const render = () => {
      const currentTime = (performance.now() - startTime) * 0.001;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      gl.uniform2f(resLoc, width, height);
      gl.uniform1f(timeLoc, currentTime);
      gl.uniform2f(mouseLoc, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      this.animId = requestAnimationFrame(render);
    };

    render();
  }
}