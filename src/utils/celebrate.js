import confetti from 'canvas-confetti';

const EMERALD_COLORS = ['#10b981', '#14b8a6', '#34d399', '#5eead4', '#fbbf24'];

let lastFiredAt = 0;

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const throttle = (gapMs = 800) => {
  const now = Date.now();
  if (now - lastFiredAt < gapMs) return false;
  lastFiredAt = now;
  return true;
};

export const celebrate = (intensity = 'task') => {
  if (reducedMotion() || !throttle()) return;

  if (intensity === 'goal') {
    const duration = 1400;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 6,
        startVelocity: 50,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: EMERALD_COLORS,
        scalar: 1.1,
      });
      confetti({
        particleCount: 6,
        startVelocity: 50,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: EMERALD_COLORS,
        scalar: 1.1,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    return;
  }

  // Subtle confetti for a single task tick
  confetti({
    particleCount: 30,
    spread: 55,
    origin: { y: 0.8 },
    colors: EMERALD_COLORS,
    ticks: 120,
    scalar: 0.8,
  });
};
