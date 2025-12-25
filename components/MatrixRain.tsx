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
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);

    // Array to track the y position of each column
    const drops: number[] = new Array(columns).fill(1);

    // Random initial positions for more organic look
    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Create gradient effect - brighter at the head
        const brightness = Math.random();
        if (brightness > 0.98) {
          // Bright white head of the rain
          ctx.fillStyle = '#ffffff';
        } else if (brightness > 0.9) {
          // Bright green
          ctx.fillStyle = '#00ff00';
        } else if (brightness > 0.7) {
          // Medium green
          ctx.fillStyle = '#00cc00';
        } else {
          // Darker green for trail
          ctx.fillStyle = '#008800';
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
        opacity: 0.35,
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default MatrixRain;
