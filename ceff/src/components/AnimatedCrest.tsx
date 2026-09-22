"use client";

import { useEffect, useRef, useState } from "react";

const VERTEX = `attribute vec2 position; varying vec2 uv;
void main(){ uv=vec2(position.x*.5+.5,.5-position.y*.5); gl_Position=vec4(position,0.,1.); }`;
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D original; uniform float time; uniform float strength; varying vec2 uv;
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
  vec2 shift=vec2(wave*(1.8+7.0*height),rise*(.8+3.5*height))*zone*strength;
  vec4 moving=texture2D(original,(p+shift)/980.);
  float selection=max(fire(base.rgb),fire(moving.rgb))*zone;
  vec4 color=mix(base,moving,selection);
  // Low-amplitude flicker retains the supplied orange and gold palette.
  color.rgb*=1.+.025*strength*sin(time*9.3+p.y*.08)*fire(moving.rgb)*zone;
  gl_FragColor=color;
}`;

export default function AnimatedCrest({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false });
    } catch { return; }
    if (!gl) return;
    const context = gl;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, disposed = false, lost = false, ready = false;
    let visible = !("IntersectionObserver" in window);
    let elapsed = 0, previous = 0, lastDraw = 0;
    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const shader = context.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      context.shaderSource(shader, source);
      context.compileShader(shader);
      return context.getShaderParameter(shader, context.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(context.VERTEX_SHADER, VERTEX);
    const fragment = compile(context.FRAGMENT_SHADER, FRAGMENT);
    const program = context.createProgram();
    const buffer = context.createBuffer();
    const texture = context.createTexture();
    const release = () => {
      context.deleteTexture(texture);
      context.deleteBuffer(buffer);
      context.deleteProgram(program);
      shaders.forEach(shader => context.deleteShader(shader));
    };
    if (!vertex || !fragment || !program || !buffer || !texture) { release(); return; }
    context.attachShader(program, vertex);
    context.attachShader(program, fragment);
    context.linkProgram(program);
    if (!context.getProgramParameter(program, context.LINK_STATUS)) { release(); return; }
    context.useProgram(program);
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), context.STATIC_DRAW);
    const position = context.getAttribLocation(program, "position");
    context.enableVertexAttribArray(position);
    context.vertexAttribPointer(position, 2, context.FLOAT, false, 0, 0);
    const time = context.getUniformLocation(program, "time");
    const strength = context.getUniformLocation(program, "strength");
    context.uniform1i(context.getUniformLocation(program, "original"), 0);

    const resize = () => {
      if (disposed || lost) return;
      const size = Math.min(980, Math.max(160, Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2))));
      if (canvas.width !== size || canvas.height !== size) {
        canvas.width = size;
        canvas.height = size;
        context.viewport(0, 0, size, size);
      }
    };
    const draw = (now: number) => {
      frame = 0;
      if (disposed || lost || !ready || !visible || document.hidden) return;
      // Cap actual drawing at 30 fps, including on 120/144 Hz displays.
      if (!lastDraw || now - lastDraw >= 1000 / 30) {
        if (previous) elapsed += Math.min((now - previous) / 1000, .1) * (motion.matches ? .35 : 1);
        previous = now;
        lastDraw = now;
        context.uniform1f(time, elapsed);
        context.uniform1f(strength, motion.matches ? .12 : 1);
        context.drawArrays(context.TRIANGLES, 0, 6);
        if (canvas.style.opacity !== "1") canvas.style.opacity = "1";
      }
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      lastDraw = 0;
      if (ready && visible && !document.hidden && !lost) frame = requestAnimationFrame(draw);
    };
    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      cancelAnimationFrame(frame);
      canvas.style.opacity = "0";
    };
    const onRestored = () => { if (!disposed) setGeneration(value => value + 1); };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }) : null;
    observer?.observe(canvas);
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", sync);
    const image = new Image();
    image.onload = () => {
      if (disposed || lost) return;
      resize();
      context.bindTexture(context.TEXTURE_2D, texture);
      context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
      context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
      context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
      context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
      try {
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
        ready = true;
        sync();
      } catch { canvas.style.opacity = "0"; }
    };
    image.src = "/escudo-blanco.jpg";
    return () => {
      disposed = true;
      image.onload = null;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      canvas.style.opacity = "0";
      release();
    };
  }, [generation]);

  return <span className={`relative inline-block aspect-square ${className}`}>
    {/* The original is always underneath, including during loading or GPU recovery. */}
    <img src="/escudo-blanco.jpg" width="980" height="980" alt="Escudo del Centro Educativo Federico Froebel" className="block h-full w-full object-contain" />
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-0" />
  </span>;
}
