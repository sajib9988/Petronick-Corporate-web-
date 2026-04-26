"use client";
import { useEffect, useRef } from "react";

class FireParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  turbulence: number;

  constructor(cx: number, w: number) {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.life = 0;
    this.decay = 0;
    this.size = 0;
    this.turbulence = 0;
    this.reset(cx, w);
  }

  reset(cx: number, w: number) {
    this.x = cx + (Math.random() - 0.5) * w * 0.7;
    this.y = 52;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = -(Math.random() * 1.4 + 0.6);
    this.life = Math.random() * 0.3 + 0.7;
    this.decay = Math.random() * 0.022 + 0.018;
    this.size = Math.random() * 7 + 4;
    this.turbulence = (Math.random() - 0.5) * 0.12;
  }
}

function getColor(life: number): string {
  if (life > 0.75) {
    const t = (life - 0.75) / 0.25;
    const r = 255;
    const g = Math.round(200 + t * 55);
    const b = Math.round(t * 120);
    return `rgba(${r},${g},${b},${life * 0.85})`;
  } else if (life > 0.45) {
    const t = (life - 0.45) / 0.3;
    const r = 255;
    const g = Math.round(80 + t * 120);
    const b = 0;
    return `rgba(${r},${g},${b},${life * 0.8})`;
  } else if (life > 0.18) {
    const t = (life - 0.18) / 0.27;
    const r = Math.round(180 + t * 75);
    const g = Math.round(t * 80);
    const b = 0;
    return `rgba(${r},${g},${b},${life * 0.7})`;
  } else {
    return `rgba(80,10,0,${life * 0.4})`;
  }
}

export function FireBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<FireParticle[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;

    // seed particles at varying life stages so fire appears instantly
    particlesRef.current = Array.from({ length: 42 }, () => {
      const p = new FireParticle(cx, W);
      p.life = Math.random();
      return p;
    });

    function loop() {
      if (!ctx) return;
      timeRef.current += 0.04;
      ctx.clearRect(0, 0, W, H);

      // spawn extras up to cap
      if (particlesRef.current.length < 58) {
        particlesRef.current.push(new FireParticle(cx, W));
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life -= p.decay;

        if (p.life <= 0) {
          p.reset(cx, W);
          continue;
        }

        // turbulent wind drift
        p.vx +=
          p.turbulence +
          Math.sin(timeRef.current * 1.8 + p.y * 0.1) * 0.04;
        p.vx *= 0.97;
        p.x += p.vx;
        p.y += p.vy;

        const size = p.size * p.life;
        const color = getColor(p.life);

        // soft radial gradient per particle
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // base ember glow
      const coreGrad = ctx.createRadialGradient(cx, 54, 0, cx, 54, 20);
      coreGrad.addColorStop(
        0,
        `rgba(255,240,180,${0.2 + Math.sin(timeRef.current * 3) * 0.07})`
      );
      coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.ellipse(cx, 54, 20, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={90}
      height={56}
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}