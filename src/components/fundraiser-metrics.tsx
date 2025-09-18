"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import type { Metrics } from '@/lib/types';

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

const AnimatedMetric = ({ value, label, subtext, format, className, delay }: { value: number; label: string; subtext: string; format: (val: number) => string; className?: string; delay: number }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const count = useCountUp(inView ? value : 0);

    return (
        <div 
            ref={ref}
            className={cn(
                "text-center flex flex-col items-center transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="text-5xl md:text-6xl font-bold font-headline tabular-nums">{format(count)}</div>
            <h3 className="text-sm font-medium uppercase text-muted-foreground mt-2">{label}</h3>
            <p className="text-xs text-muted-foreground">{subtext}</p>
        </div>
    );
};


export function FundraiserMetrics({ metrics }: { metrics: Metrics }) {
  const { goal, raised, slots } = metrics;
  const amountLeft = goal > raised ? goal - raised : 0;
  
  const formatNGN = (amount: number) => {
    return `N${new Intl.NumberFormat('en-NG').format(amount)}`;
  }

  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('en-NG').format(amount);
  }

  const metricItems = [
    { value: raised, label: 'Total Raised', subtext: `${(raised/goal * 100).toFixed(0)}% of goal`, format: formatNGN },
    { value: goal, label: 'Fundraising Goal', subtext: 'Our target for this round', format: formatNGN },
    { value: amountLeft, label: 'Amount Left', subtext: 'to reach our goal', format: formatNGN },
    { value: slots, label: 'Available Slots', subtext: 'for new brands to join', format: formatNumber },
  ]

  return (
    <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
      {metricItems.map((item, index) => (
        <AnimatedMetric 
          key={item.label}
          value={item.value}
          label={item.label}
          subtext={item.subtext}
          format={item.format}
          delay={index * 100}
        />
      ))}
    </div>
  );
}
