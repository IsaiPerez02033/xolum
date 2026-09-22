"use client";

import { useEffect, useRef } from "react";

const VERTEX = `attribute vec2 position; varying vec2 uv;
void main(){ uv=vec2(position.x*.5+.5,.5-position.y*.5); gl_Position=vec4(position,0.,1.); }`;
const FRAGMENT = `precision highp float;
uniform sampler2D original; uniform float time; varying vec2 uv;
float fire(vec3 c){return smoothstep(.055,.13,c.r-c.g)*smoothstep(.08,.22,c.g-c.b)*smoothstep(.55,.75,c.r);}
void main(){
  vec4 base=texture2D(original,uv);
  vec2 p=uv*980.;
  // Only the original flame's pixels can move; lettering, shield and torch stay still.
  float zone=smoothstep(435.,451.,p.x)*(1.-smoothstep(548.,562.,p.x))
    *smoothstep(324.,338.,p.y)*(1.-smoothstep(457.,470.,p.y));
  float height=clamp((469.-p.y)/132.,0.,1.);
  float wave=sin(p.y*.075+time*5.1)+.48*sin(p.y*.151+time*8.3)+.22*sin(p.y*.29+time*12.7);
  float rise=sin(p.x*.11+time*6.4)+.35*sin(p.y*.18+time*9.1);
  vec2 shift=vec2(wave*(1.2+4.2*height),rise*(.5+2.0*height))*zone;
  vec4 moving=texture2D(original,(p+shift)/980.);
  float selection=max(fire(base.rgb),fire(moving.rgb))*zone;
  vec4 color=mix(base,moving,selection);
  // Low-amplitude flicker retains the supplied orange and gold palette.
  color.rgb*=1.+.018*sin(time*9.3+p.y*.08)*fire(moving.rgb)*zone;
  gl_FragColor=color;
}`;

export default function AnimatedCrest({ className = "", paused = false }: { className?: string; paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || paused) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, preserveDrawingBuffer: true });
    if (!gl) return;
    let frame = 0, disposed = false, visible = false, ready = false;
    let elapsed = 0, previous = 0;
    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader); gl.shaderSource(shader, source); gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(gl.VERTEX_SHADER, VERTEX), fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) { shaders.forEach(s => gl.deleteShader(s)); return; }
    gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); return; }
    gl.useProgram(program);
    const buffer = gl.createBuffer(), texture = gl.createTexture();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const time = gl.getUniformLocation(program, "time");
    gl.uniform1i(gl.getUniformLocation(program, "original"), 0);
    const draw = (now: number) => {
      frame = 0;
      if (disposed || !ready || !visible || document.hidden || motion.matches) return;
      if (previous) elapsed += Math.min((now - previous) / 1000, .05);
      previous = now;
      gl.uniform1f(time, elapsed); gl.drawArrays(gl.TRIANGLES, 0, 6);
      canvas.style.opacity = "1";
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; previous = 0;
      if (motion.matches) canvas.style.opacity = "0";
      if (ready && visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync); motion.addEventListener("change", sync);
    const image = new Image();
    image.onload = () => {
      if (disposed) return;
      // Match the source resolution for the large preview, cap unnecessary GPU work.
      const size = Math.min(980, Math.max(160, Math.round(canvas.clientWidth * Math.min(devicePixelRatio, 2))));
      canvas.width = size; canvas.height = size; gl.viewport(0, 0, size, size);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      ready = true; sync();
    };
    image.src = "/escudo-blanco.jpg";
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect();
      document.removeEventListener("visibilitychange", sync); motion.removeEventListener("change", sync);
      canvas.style.opacity = "0";
      gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach(s => gl.deleteShader(s));
    };
  }, [paused]);
  return <span className={`relative inline-block aspect-square ${className}`}>
    {/* Original remains visible if motion is disabled or WebGL is unavailable. */}
    <img src="/escudo-blanco.jpg" width="980" height="980" alt="Escudo del Centro Educativo Federico Froebel" className="block h-full w-full object-contain" />
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-0" />
  </span>;
}
