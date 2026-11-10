import { useEffect, useRef } from 'react';

interface AmbientBackgroundProps {
  intensity?: 'subtle' | 'celebration';
  activeStep: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'dust' | 'petal' | 'heart' | 'star';
  rotation: number;
  rotationSpeed: number;
  swayOffset: number;
  swaySpeed: number;
}

interface FireworkSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
}

export default function AmbientBackground({ intensity = 'subtle', activeStep }: AmbientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particles: Particle[] = [];
    const isCelebration = activeStep === 5 || intensity === 'celebration';
    const particleCount = isCelebration ? 75 : 45;

    const goldColors = ['#fcedbe', '#ecc94b', '#d4af37', '#fff8e7', '#f4c2c2', '#e8a2af'];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      let type: 'dust' | 'petal' | 'heart' | 'star' = 'dust';
      if (isCelebration) {
        if (typeRand > 0.7) type = 'petal';
        else if (typeRand > 0.5) type = 'heart';
        else if (typeRand > 0.3) type = 'star';
      } else {
        if (typeRand > 0.85) type = 'petal';
        else if (typeRand > 0.7) type = 'star';
        else if (typeRand > 0.6) type = 'heart';
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'dust' ? Math.random() * 2 + 1 : Math.random() * 8 + 6,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: type === 'petal' ? Math.random() * 0.8 + 0.4 : -(Math.random() * 0.5 + 0.2),
        opacity: Math.random() * 0.6 + 0.2,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        type,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Fireworks array (only active in celebration)
    const sparks: FireworkSpark[] = [];
    let lastFireworkTime = 0;

    const createFirework = (targetX: number, targetY: number) => {
      const burstColors = [
        ['#ffd700', '#fff8dc', '#ffb347'], // Gold & Champagne
        ['#ff77a9', '#ff99c8', '#ffffff'], // Rose Pink & White
        ['#e6c280', '#f4a460', '#ffdab9'], // Peach & Warm Gold
        ['#ff5e7e', '#ffd1dc', '#fff'],    // Heart Pink & Pearl
      ];
      const palette = burstColors[Math.floor(Math.random() * burstColors.length)];
      const sparkCount = Math.floor(Math.random() * 35) + 45;

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.2;
        const speed = Math.random() * 4.5 + 1.8;
        sparks.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: palette[Math.floor(Math.random() * palette.length)],
          size: Math.random() * 2.5 + 1.2,
          decay: Math.random() * 0.015 + 0.01,
          gravity: 0.045,
        });
      }
    };

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.2);
      c.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawPetal = (c: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.rotate((rotation * Math.PI) / 180);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      c.ellipse(0, 0, size * 0.5, size, Math.PI / 6, 0, 2 * Math.PI);
      c.fill();
      c.restore();
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Radial ambient lighting
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );

      if (isCelebration) {
        gradient.addColorStop(0, '#2b101d');
        gradient.addColorStop(0.35, '#1e0c15');
        gradient.addColorStop(0.7, '#12070d');
        gradient.addColorStop(1, '#080406');
      } else {
        gradient.addColorStop(0, '#1c0e16');
        gradient.addColorStop(0.4, '#130910');
        gradient.addColorStop(0.75, '#0c060a');
        gradient.addColorStop(1, '#070305');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle top warm vignette
      const topGoldGlow = ctx.createRadialGradient(width * 0.5, 0, 0, width * 0.5, 0, height * 0.6);
      topGoldGlow.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
      topGoldGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topGoldGlow;
      ctx.fillRect(0, 0, width, height);

      // Render Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.swayOffset += p.swaySpeed;
        p.rotation += p.rotationSpeed;
        p.x += p.speedX + Math.sin(p.swayOffset) * 0.35;
        p.y += p.speedY;

        // Wrap around boundaries smoothly
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else if (p.y > height + 20) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        if (p.x < -20) p.x = width + 10;
        else if (p.x > width + 20) p.x = -10;

        if (p.type === 'dust') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity * 0.7);
        } else if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity * 0.65);
        } else if (p.type === 'star') {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 8, p.size, p.size / 4);
          ctx.fillRect(-p.size / 8, -p.size / 2, p.size / 4, p.size);
          ctx.restore();
        }
      }

      // Render Fireworks in celebration mode
      if (isCelebration) {
        if (time - lastFireworkTime > 1600 + Math.random() * 1200) {
          const fx = width * 0.15 + Math.random() * (width * 0.7);
          const fy = height * 0.15 + Math.random() * (height * 0.35);
          createFirework(fx, fy);
          lastFireworkTime = time;
        }

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vy += s.gravity;
          s.vx *= 0.985;
          s.vy *= 0.985;
          s.alpha -= s.decay;

          if (s.alpha <= 0) {
            sparks.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = s.alpha;
          ctx.shadowBlur = 10;
          ctx.shadowColor = s.color;
          ctx.fill();
        }
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, activeStep]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}
