import confetti from 'canvas-confetti';

export function fireConfetti() {
  const defaults = {
    colors: ['#52b788', '#2d9e6b', '#ffffff', '#8dd8b0', '#dcf5e7'],
    spread: 70,
    ticks: 100,
    gravity: 1.2,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['circle', 'square'],
  };

  confetti({
    ...defaults,
    particleCount: 50,
    origin: { x: 0.3, y: 0.6 },
    angle: 60,
  });

  confetti({
    ...defaults,
    particleCount: 50,
    origin: { x: 0.7, y: 0.6 },
    angle: 120,
  });

  // Second burst
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 30,
      origin: { x: 0.5, y: 0.5 },
      spread: 120,
    });
  }, 200);
}

export function fireBigConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  const colors = ['#52b788', '#2d9e6b', '#ffffff', '#8dd8b0', '#4cc9f0'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export default function ConfettiBlast({ trigger }) {
  if (trigger) {
    fireConfetti();
  }
  return null;
}
