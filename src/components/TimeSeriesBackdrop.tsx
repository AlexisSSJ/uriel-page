import { useEffect, useRef } from "react";

interface TimeSeriesBackdropProps {
  isDark: boolean;
  pointerRatioX: number | null;
}

interface DataPoint {
  value: number;
  volume: number;
}

function generateInitialSeries(count: number): DataPoint[] {
  const points: DataPoint[] = [];
  let price = 100;
  let momentum = 0.08;
  let volatility = 1.05;

  for (let i = 0; i < count; i++) {
    // Stochastic volatility clustering + slight upward actuarial/equity drift
    volatility = Math.max(0.45, Math.min(2.2, volatility * 0.92 + (Math.random() - 0.46) * 0.35));
    const shock = (Math.random() + Math.random() + Math.random() - 1.5) * 1.35 * volatility;
    momentum = momentum * 0.86 + shock * 0.14;
    const meanReversion = (108 - price) * 0.008;
    price = Math.max(64, Math.min(148, price + momentum + shock * 0.72 + meanReversion + 0.04));

    const volume = Math.min(1, Math.max(0.08, Math.abs(shock) * 0.32 + Math.random() * 0.25));
    points.push({ value: price, volume });
  }
  return points;
}

function nextPoint(prev: DataPoint, targetAnchor: number): DataPoint {
  const shock = (Math.random() + Math.random() + Math.random() - 1.5) * 1.7;
  const meanReversion = (targetAnchor - prev.value) * 0.025;
  const nextVal = Math.max(62, Math.min(150, prev.value + shock + meanReversion));
  const volume = Math.min(1, Math.max(0.08, Math.abs(shock) * 0.36 + Math.random() * 0.22));
  return { value: nextVal, volume };
}

export function TimeSeriesBackdrop({ isDark, pointerRatioX }: TimeSeriesBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<number | null>(pointerRatioX);
  const themeRef = useRef<boolean>(isDark);

  useEffect(() => {
    pointerRef.current = pointerRatioX;
  }, [pointerRatioX]);

  useEffect(() => {
    themeRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const POINT_COUNT = 132;
    const TICK_INTERVAL_MS = 220;
    const series = generateInitialSeries(POINT_COUNT);
    let pendingTarget = nextPoint(series[series.length - 1], 108);
    let lastTickTime = performance.now();
    let rafId = 0;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) {
        if (!prefersReducedMotion) rafId = requestAnimationFrame(draw);
        return;
      }

      let progress = 0;
      if (!prefersReducedMotion) {
        const elapsed = now - lastTickTime;
        if (elapsed >= TICK_INTERVAL_MS) {
          series.shift();
          series.push(pendingTarget);
          const driftAnchor = 104 + Math.sin(now * 0.00018) * 14;
          pendingTarget = nextPoint(pendingTarget, driftAnchor);
          lastTickTime = now - (elapsed % TICK_INTERVAL_MS);
        }
        progress = Math.min(1, (now - lastTickTime) / TICK_INTERVAL_MS);
      }

      ctx.clearRect(0, 0, width, height);

      const dark = themeRef.current;
      const padTop = height * 0.14;
      const padBottom = height * 0.14;
      const usableH = height - padTop - padBottom;

      // Compute smooth min/max bounds across visible points
      let minVal = Infinity;
      let maxVal = -Infinity;
      for (let i = 0; i < series.length; i++) {
        const v = series[i].value;
        if (v < minVal) minVal = v;
        if (v > maxVal) maxVal = v;
      }
      const span = Math.max(16, maxVal - minVal);
      const low = minVal - span * 0.14;
      const high = maxVal + span * 0.14;

      const toY = (val: number) =>
        padTop + usableH - ((val - low) / (high - low)) * usableH;

      const stepX = width / (POINT_COUNT - 2);
      const shiftX = progress * stepX;

      // 1. Subtle architectural horizontal price grid hairlines
      ctx.lineWidth = 1;
      ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.045)" : "rgba(17, 17, 17, 0.06)";
      const gridLines = 4;
      for (let g = 0; g <= gridLines; g++) {
        const gy = Math.round(padTop + (usableH / gridLines) * g) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      // 2. Subtle vertical time grid hairlines
      const vStep = Math.max(88, Math.floor(width / 10));
      const vOffset = ((now * 0.014) % vStep) * (prefersReducedMotion ? 0 : 1);
      ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.028)" : "rgba(17, 17, 17, 0.04)";
      for (let vx = width - vOffset; vx >= 0; vx -= vStep) {
        const x = Math.round(vx) + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, padTop);
        ctx.lineTo(x, height - padBottom * 0.5);
        ctx.stroke();
      }

      // Build screen coordinates
      const coords: { x: number; y: number; vol: number }[] = [];
      for (let i = 0; i < series.length; i++) {
        const x = i * stepX - shiftX;
        const y = toY(series[i].value);
        coords.push({ x, y, vol: series[i].volume });
      }
      // Interpolate live leading point
      const last = series[series.length - 1];
      const interpVal = last.value + (pendingTarget.value - last.value) * progress;
      const leadX = (series.length - 1) * stepX;
      const leadY = toY(interpVal);

      // 3. Faint bottom volume bars (realistic market microstructure)
      const volMaxH = height * 0.16;
      const baseLine = height - padBottom * 0.45;
      ctx.fillStyle = dark ? "rgba(255, 255, 255, 0.055)" : "rgba(17, 17, 17, 0.065)";
      const barW = Math.max(1.5, stepX * 0.42);
      for (let i = 0; i < coords.length; i++) {
        const bh = coords[i].vol * volMaxH;
        ctx.fillRect(coords[i].x - barW * 0.5, baseLine - bh, barW, bh);
      }

      // 4. Area fill under the main time-series line
      const areaGrad = ctx.createLinearGradient(0, padTop, 0, baseLine);
      if (dark) {
        areaGrad.addColorStop(0, "rgba(215, 228, 240, 0.13)");
        areaGrad.addColorStop(0.55, "rgba(215, 228, 240, 0.035)");
        areaGrad.addColorStop(1, "rgba(11, 11, 12, 0)");
      } else {
        areaGrad.addColorStop(0, "rgba(17, 17, 17, 0.10)");
        areaGrad.addColorStop(0.6, "rgba(17, 17, 17, 0.025)");
        areaGrad.addColorStop(1, "rgba(217, 217, 217, 0)");
      }

      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);
      for (let i = 1; i < coords.length; i++) {
        ctx.lineTo(coords[i].x, coords[i].y);
      }
      ctx.lineTo(leadX, leadY);
      ctx.lineTo(leadX, baseLine);
      ctx.lineTo(coords[0].x, baseLine);
      ctx.closePath();
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // 5. Secondary 12-period Moving Average line (subtle dashed/thin trendline)
      const windowSize = 12;
      ctx.beginPath();
      let maStarted = false;
      for (let i = windowSize - 1; i < series.length; i++) {
        let sum = 0;
        for (let k = i - windowSize + 1; k <= i; k++) {
          sum += series[k].value;
        }
        const maY = toY(sum / windowSize);
        const mx = coords[i].x;
        if (!maStarted) {
          ctx.moveTo(mx, maY);
          maStarted = true;
        } else {
          ctx.lineTo(mx, maY);
        }
      }
      ctx.save();
      ctx.setLineDash([3, 4]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.16)" : "rgba(17, 17, 17, 0.18)";
      ctx.stroke();
      ctx.restore();

      // 6. Primary crisp price time-series stroke
      const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
      if (dark) {
        lineGrad.addColorStop(0, "rgba(255, 255, 255, 0.06)");
        lineGrad.addColorStop(0.25, "rgba(226, 232, 240, 0.28)");
        lineGrad.addColorStop(0.75, "rgba(241, 245, 249, 0.42)");
        lineGrad.addColorStop(1, "rgba(255, 255, 255, 0.62)");
      } else {
        lineGrad.addColorStop(0, "rgba(17, 17, 17, 0.06)");
        lineGrad.addColorStop(0.25, "rgba(17, 17, 17, 0.24)");
        lineGrad.addColorStop(0.8, "rgba(17, 17, 17, 0.38)");
        lineGrad.addColorStop(1, "rgba(17, 17, 17, 0.55)");
      }

      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);
      for (let i = 1; i < coords.length; i++) {
        ctx.lineTo(coords[i].x, coords[i].y);
      }
      ctx.lineTo(leadX, leadY);
      ctx.lineWidth = 1.45;
      ctx.lineJoin = "round";
      ctx.strokeStyle = lineGrad;
      ctx.stroke();

      // 7. Live price horizontal reference hairline & terminal tick point
      ctx.save();
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.18)" : "rgba(17, 17, 17, 0.18)";
      ctx.beginPath();
      ctx.moveTo(0, Math.round(leadY) + 0.5);
      ctx.lineTo(leadX, Math.round(leadY) + 0.5);
      ctx.stroke();
      ctx.restore();

      // Subtle glow around live tick point
      const glow = ctx.createRadialGradient(leadX, leadY, 0, leadX, leadY, 12);
      if (dark) {
        glow.addColorStop(0, "rgba(255, 255, 255, 0.55)");
        glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        glow.addColorStop(0, "rgba(17, 17, 17, 0.35)");
        glow.addColorStop(1, "rgba(17, 17, 17, 0)");
      }
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(leadX, leadY, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = dark ? "rgba(255, 255, 255, 0.85)" : "rgba(17, 17, 17, 0.78)";
      ctx.beginPath();
      ctx.arc(leadX, leadY, 2.3, 0, Math.PI * 2);
      ctx.fill();

      // 8. Interactive subtle vertical crosshair when pointer hovers hero
      const pxRatio = pointerRef.current;
      if (pxRatio !== null && pxRatio >= 0 && pxRatio <= 1) {
        const cx = pxRatio * width;
        const nearestIdx = Math.max(
          0,
          Math.min(coords.length - 1, Math.round((cx + shiftX) / stepX))
        );
        const pt = coords[nearestIdx];
        if (pt) {
          ctx.save();
          ctx.lineWidth = 1;
          ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.16)" : "rgba(17, 17, 17, 0.18)";
          ctx.beginPath();
          ctx.moveTo(Math.round(pt.x) + 0.5, padTop);
          ctx.lineTo(Math.round(pt.x) + 0.5, baseLine);
          ctx.stroke();

          ctx.fillStyle = dark ? "rgba(255, 255, 255, 0.9)" : "rgba(17, 17, 17, 0.85)";
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="no-print pointer-events-none absolute inset-x-0 inset-y-4 overflow-hidden select-none"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 92%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
}
