import React, { useEffect, useRef } from 'react';

export const HeroShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(syncSize)
      : null;

    if (resizeObserver) {
      resizeObserver.observe(canvas);
    }
    syncSize();

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Kinetic obsidian sports mesh with subtle electric lime energy pulse
void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
    float t = u_time * 0.35;
    
    // Warped athletic grid lines
    vec2 p = st * 2.8;
    float d = length(p);
    
    // Wave distortions
    p.x += sin(p.y * 1.4 + t) * 0.3;
    p.y += cos(p.x * 1.1 - t * 0.7) * 0.3;
    
    // Tech athletic wireframe lines
    float lineX = abs(fract(p.x) - 0.5);
    float lineY = abs(fract(p.y) - 0.5);
    float grid = smoothstep(0.02, 0.08, min(lineX, lineY));
    grid = 1.0 - grid;
    
    // Energy wave ripple
    float ripple = sin(d * 3.8 - t * 1.8) * 0.5 + 0.5;
    
    // Colors: Deep Obsidian #08090B to Graphite #17191D with Electric Lime #C6FF35 highlights
    vec3 baseColor = vec3(0.031, 0.035, 0.043);
    vec3 graphite = vec3(0.09, 0.098, 0.114);
    vec3 limeGlow = vec3(0.776, 1.0, 0.208);
    
    // Vignette
    float vig = smoothstep(1.7, 0.4, length(st));
    
    vec3 finalColor = mix(baseColor, graphite, ripple * 0.35);
    finalColor += limeGlow * (grid * 0.16 + pow(ripple, 5.0) * 0.1) * vig;
    
    // Mouse interactive focal glow
    vec2 mouseNorm = (u_mouse / u_resolution) * 2.0 - 1.0;
    mouseNorm.y = -mouseNorm.y;
    float mouseSpot = exp(-length(st - mouseNorm * 0.8) * 2.5);
    finalColor += limeGlow * mouseSpot * 0.12;
    
    gl_FragColor = vec4(finalColor * vig, 1.0);
}`;

    function createShader(type: number, src: string): WebGLShader | null {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vertShader = createShader(gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;

    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;

    function render(t: number) {
      if (!gl || !canvas) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, prefersReducedMotion ? 1.0 : t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    render(0);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (gl) {
        gl.deleteProgram(prog);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(buf);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-45"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-container-lowest/40 to-surface-container-lowest" />
    </div>
  );
};
