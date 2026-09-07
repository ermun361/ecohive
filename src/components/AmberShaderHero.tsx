import React, { useEffect, useRef, useState } from 'react';

// GLSL Vertex Shader Source
const VERTEX_SHADER_SOURCE = `
attribute vec2 position;
varying vec2 v_uv;

void main() {
  v_uv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// GLSL Fragment Shader Source: Organic Honey Flow & Bio-Resin Caustics
const FRAGMENT_SHADER_SOURCE = `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 v_uv;

// Simplex-inspired 2D noise implementation for natural fluid turbulence
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  // 1. Coordinate normalization (centered, aspect-ratio corrected)
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // 2. Interactive mouse attractor with smooth falloff
  vec2 mouse = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float mouseDist = length(p - mouse);
  vec2 mousePush = normalize(p - mouse + 0.0001) * (0.22 / (mouseDist * 3.0 + 0.8));

  // 3. Multi-scale viscous honey wave simulation
  float t = u_time * 0.25;
  vec2 flowUV = p * 1.25 + mousePush;

  float n1 = snoise(flowUV + vec2(t * 0.35, -t * 0.25));
  float n2 = snoise(flowUV * 2.0 + vec2(-t * 0.2, t * 0.3) + vec2(n1 * 0.35));
  
  // Caustics & internal optical refraction
  float caustics = sin(n1 * 3.1415 + t) * cos(n2 * 3.1415 - t * 0.6);
  caustics = pow(abs(caustics), 2.2);

  // 4. EcoHive Brand Palette: Clean Warm Cream -> Raw Honey Gold -> Amber Nectar
  vec3 baseCream   = vec3(0.992, 0.984, 0.968); // #FDFBF7
  vec3 lightHoney  = vec3(0.996, 0.886, 0.584); // Amber 200
  vec3 goldenAmber = vec3(0.961, 0.690, 0.184); // Amber 400
  vec3 deepNectar  = vec3(0.851, 0.490, 0.114); // Amber 600

  // Blend layers (tuned for pristine high-contrast readability of dark foreground text)
  vec3 col = baseCream;
  float intensity = smoothstep(-0.35, 0.85, n1 + n2 * 0.45 + caustics * 0.4);
  col = mix(col, lightHoney, intensity * 0.38);
  col = mix(col, goldenAmber, pow(intensity, 2.2) * 0.24);

  // Interactive mouse bloom
  float mouseGlow = smoothstep(1.0, 0.0, mouseDist);
  col = mix(col, deepNectar, mouseGlow * 0.16 * (0.6 + 0.4 * caustics));

  // 5. Subtle micro-grain for authentic organic resin feel
  float grain = fract(sin(dot(uv + fract(u_time * 0.005), vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.016;

  gl_FragColor = vec4(col, 1.0);
}
`;

export const AmberShaderHero: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [glReady, setGlReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL context
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      console.warn('WebGL not supported, falling back to CSS gradient.');
      return;
    }

    // Shader compilation helper
    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Quad geometry covering full clip space (-1 to +1)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');

    setGlReady(true);

    // State for mouse coordinates & responsiveness
    let mouseX = canvas.clientWidth * 0.5;
    let mouseY = canvas.clientHeight * 0.4;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left);
      targetMouseY = (rect.height - (e.clientY - rect.top)); // Invert Y for GL coords
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler: Cap DPR at 2.0 for performance optimization
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation Loop with Visibility & Reduced-Motion checks
    let animationFrameId: number;
    let startTime = performance.now();
    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !motionQuery.matches) {
        startTime = performance.now(); // Avoid sudden jumps
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isTabVisible || motionQuery.matches) return;

      // Smooth mouse damping
      mouseX += (targetMouseX * (canvas.width / canvas.clientWidth) - mouseX) * 0.08;
      mouseY += (targetMouseY * (canvas.height / canvas.clientHeight) - mouseY) * 0.08;

      const elapsedSeconds = (performance.now() - startTime) * 0.001;

      gl.uniform1f(timeLoc, elapsedSeconds);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    // Initial render
    render();

    // If reduced motion is preferred, render single initial frame and do not loop
    if (motionQuery.matches) {
      gl.uniform1f(timeLoc, 1.5);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, canvas.width * 0.5, canvas.height * 0.5);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Interactive WebGL Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          glReady && !prefersReducedMotion ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Fallback Static Gradient for Reduced-Motion or Unsupported WebGL */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br from-amber-400/20 via-[#FFFDF7] to-amber-200/30 transition-opacity duration-500 ${
          !glReady || prefersReducedMotion ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
