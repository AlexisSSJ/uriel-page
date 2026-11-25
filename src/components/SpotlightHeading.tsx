import { useEffect, useRef, type ReactNode } from "react";

type HeadingTag = "h1" | "h2";

interface SpotlightHeadingProps {
  as: HeadingTag;
  id?: string;
  radius?: number;
  className?: string;
  children: ReactNode;
}

// Shared zero-rerender pointer tracker for all registered headings
const registered = new Set<HTMLElement>();
let latestX = -9999;
let latestY = -9999;
let pointerActive = false;
let rafPending = false;
let listenersAttached = false;

function flushPointer() {
  rafPending = false;
  for (const el of registered) {
    if (!pointerActive) {
      el.style.setProperty("--light-opacity", "0");
      continue;
    }
    const rect = el.getBoundingClientRect();
    const radius = Number(el.dataset.lightRadius) || 180;
    const withinX = latestX >= rect.left - radius && latestX <= rect.right + radius;
    const withinY = latestY >= rect.top - radius && latestY <= rect.bottom + radius;

    if (withinX && withinY) {
      const mx = latestX - rect.left;
      const my = latestY - rect.top;
      el.style.setProperty("--mx", `${mx.toFixed(1)}px`);
      el.style.setProperty("--my", `${my.toFixed(1)}px`);
      el.style.setProperty("--light-opacity", "1");
    } else {
      el.style.setProperty("--light-opacity", "0");
    }
  }
}

function scheduleFlush() {
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(flushPointer);
  }
}

function handlePointerMove(e: PointerEvent) {
  latestX = e.clientX;
  latestY = e.clientY;
  pointerActive = true;
  scheduleFlush();
}

function handlePointerLeave() {
  pointerActive = false;
  scheduleFlush();
}

function attachGlobalListeners() {
  if (listenersAttached || typeof window === "undefined") return;
  listenersAttached = true;
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  document.addEventListener("pointerleave", handlePointerLeave, { passive: true });
  window.addEventListener("blur", handlePointerLeave, { passive: true });
  window.addEventListener("scroll", scheduleFlush, { passive: true });
}

function detachGlobalListenersIfEmpty() {
  if (!listenersAttached || registered.size > 0 || typeof window === "undefined") return;
  listenersAttached = false;
  window.removeEventListener("pointermove", handlePointerMove);
  document.removeEventListener("pointerleave", handlePointerLeave);
  window.removeEventListener("blur", handlePointerLeave);
  window.removeEventListener("scroll", scheduleFlush);
}

export function SpotlightHeading({
  as,
  id,
  radius = 180,
  className = "",
  children,
}: SpotlightHeadingProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    el.style.setProperty("--light-radius", `${radius}px`);
    el.style.setProperty("--light-opacity", "0");
    registered.add(el);
    attachGlobalListeners();

    return () => {
      registered.delete(el);
      detachGlobalListenersIfEmpty();
    };
  }, [radius]);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      id={id}
      data-light-radius={radius}
      className={`spotlight-heading relative inline-block ${className}`}
    >
      <span className="spotlight-base">{children}</span>
      <span aria-hidden="true" className="no-print spotlight-glow pointer-events-none select-none">
        {children}
      </span>
    </Tag>
  );
}
