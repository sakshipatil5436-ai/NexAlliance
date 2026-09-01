import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ 
  end = 100, 
  duration = 2000, 
  prefix = "", 
  suffix = "+", 
  decimals = 0 
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (counterRef.current) {
            observer.unobserve(counterRef.current);
          }
        }
      },
      { threshold: 0.15 }
    );

    const targetEl = counterRef.current;
    if (targetEl) {
      observer.observe(targetEl);
    }

    return () => {
      if (targetEl) {
        observer.unobserve(targetEl);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationFrameId;
    let lastValue = -1;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out cubic formula for smooth count up effect
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = easeOutProgress * end;

      const formattedVal = decimals > 0 ? Number(currentCount.toFixed(decimals)) : Math.floor(currentCount);
      if (formattedVal !== lastValue) {
        lastValue = formattedVal;
        setCount(currentCount);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration, decimals]);

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count);

  return (
    <span ref={counterRef} className="inline-block">
      {prefix}{formattedCount}{suffix}
    </span>
  );
}
