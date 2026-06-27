"use client";

import { useEffect, useState } from "react";

export interface ClickPulse {
  id: string;
  x: number;
  y: number;
}

interface ClickPulseOverlayProps {
  pulses: ClickPulse[];
  onPulseEnd: (id: string) => void;
}

export function ClickPulseOverlay({ pulses, onPulseEnd }: ClickPulseOverlayProps) {
  return (
    <>
      {pulses.map((pulse) => (
        <ClickPulseItem
          key={pulse.id}
          pulse={pulse}
          onEnd={() => onPulseEnd(pulse.id)}
        />
      ))}
    </>
  );
}

function ClickPulseItem({
  pulse,
  onEnd,
}: {
  pulse: ClickPulse;
  onEnd: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
      onEnd();
    }, 500);
    return () => window.clearTimeout(timer);
  }, [onEnd]);

  if (!visible) return null;

  return (
    <svg
      className="live-feedback-click-pulse"
      style={{ left: pulse.x, top: pulse.y }}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      aria-hidden
    >
      <circle className="live-feedback-click-pulse__ring" cx="24" cy="24" r="10" />
      <circle className="live-feedback-click-pulse__core" cx="24" cy="24" r="3" />
    </svg>
  );
}
