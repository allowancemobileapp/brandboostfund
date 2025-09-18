"use client";

import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";

function useCountUp(end: number, start = 0, duration = 2000) {
  const [count, setCount] = useState(start);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      // Ease-out quad function
      const easedProgress = progress * (2 - progress);
      setCount(Math.floor(end * easedProgress));

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [end, frameRate, totalFrames]);

  return count;
}

const formatNGN = (amount: number) => {
    return `N${new Intl.NumberFormat('en-NG').format(amount)}`;
}

export function AnimatedGoalBadge({ goal }: { goal: number }) {
  const count = useCountUp(goal);

  return (
    <Badge
      variant="secondary"
      className="bg-accent/10 text-accent border-accent/20 backdrop-blur-sm hover:bg-accent/20 transition-all text-sm py-1 px-4"
    >
      Fundraiser Goal: {formatNGN(count)}
    </Badge>
  );
}
