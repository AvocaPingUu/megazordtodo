// components/BackgroundThreads.jsx
"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

// ── Original Shader-Strings aus deinem Code ──
const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;
#define PI 3.1415926538
const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;
// ... (dein kompletter Perlin2D, pixel, lineFn, mainImage Code hier – kopiere den Rest aus deinem Original!)
void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

export default function BackgroundThreads({
  color = [0.6, 0.4, 1.0],         // heller Violett – passe an dein Theme an
  amplitude = 1.2,
  distance = 0.35,
  enableMouseInteraction = true,
}) {
  const containerRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const canvas = gl.canvas;
    container.appendChild(canvas);

    // WICHTIG: Fixed full-screen Styles
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      zIndex: "-10",
      pointerEvents: "none",
      display: "block",
    });

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Color() },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    // Resize-Handler – verwendet window-Maße (verhindert Verzerrung!)
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      program.uniforms.iResolution.value.set(w, h, w / h);
      // Extra: Canvas-Maße explizit setzen
      canvas.width = w;
      canvas.height = h;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize); // für Mobile
    resize(); // Sofort initialisieren

    // Mouse (window-weit – smoother!)
    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    const onMouseMove = (e) => {
      targetMouse[0] = e.clientX / window.innerWidth;
      targetMouse[1] = 1 - e.clientY / window.innerHeight;
    };

    const onMouseLeave = () => (targetMouse = [0.5, 0.5]);

    if (enableMouseInteraction) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
    }

    // Animation
    const update = (t) => {
      program.uniforms.iTime.value = t * 0.001;

      if (enableMouseInteraction) {
        const smoothing = 0.05;
        currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value.set(currentMouse);
      } else {
        program.uniforms.uMouse.value.set([0.5, 0.5]);
      }

      renderer.render({ scene: mesh });
      rafId.current = requestAnimationFrame(update);
    };

    rafId.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      if (enableMouseInteraction) {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
      }
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />;
}