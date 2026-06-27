export interface ScanningGridController {
  stop: () => void;
}

export function startScanningGrid(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
): ScanningGridController {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return { stop: () => undefined };
  }

  canvas.width = width;
  canvas.height = height;

  let rafId = 0;
  let offset = 0;
  const cell = 28;

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalAlpha = 0.15;

    const gradient = ctx.createLinearGradient(0, offset, 0, offset + height * 0.45);
    gradient.addColorStop(0, "rgba(77, 159, 255, 0)");
    gradient.addColorStop(0.45, "rgba(77, 159, 255, 0.85)");
    gradient.addColorStop(1, "rgba(77, 159, 255, 0)");

    ctx.strokeStyle = "rgba(77, 159, 255, 0.35)";
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += cell) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += cell) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    offset = (offset + 2.2) % (height + cell);
    rafId = requestAnimationFrame(draw);
  };

  rafId = requestAnimationFrame(draw);

  return {
    stop: () => {
      if (rafId) cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, width, height);
    },
  };
}
