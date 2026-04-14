import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Matrix characters - mix of letters, numbers and symbols
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]|;:<>?';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);

    // Array to track the y position of each column
    const drops: number[] = new Array(columns).fill(1);

    // Random initial positions for more organic look
    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Slightly stronger fade so trails don't smear into grey
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // More saturated neon-green palette with a glowing head.
        const brightness = Math.random();
        if (brightness > 0.985) {
          ctx.shadowColor = '#39ff14';
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#eaffea';
        } else if (brightness > 0.9) {
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 6;
          ctx.fillStyle = '#39ff14';
        } else if (brightness > 0.65) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#00e03a';
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#00a62b';
        }

        ctx.fillText(text, x, y);

        // Reset drop when it reaches bottom with some randomness
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Recalculate columns
      const newColumns = Math.floor(width / fontSize);
      drops.length = newColumns;
      for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) {
          drops[i] = Math.random() * -100;
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: 0.75,
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default MatrixRain;
