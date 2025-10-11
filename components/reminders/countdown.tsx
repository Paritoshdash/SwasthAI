"use client";

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetTime: string; // "HH:mm" format
}

function calculateRemainingTime(targetTime: string) {
  const [targetHour, targetMinute] = targetTime.split(':').map(Number);

  const now = new Date();
  let target = new Date();
  target.setHours(targetHour, targetMinute, 0, 0);

  // If the target time has already passed today, set it for tomorrow
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }

  const difference = target.getTime() - now.getTime();

  if (difference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { hours, minutes, seconds };
}

export function Countdown({ targetTime }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateRemainingTime(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateRemainingTime(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const isTimeUp = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isTimeUp) {
    return <span className="font-bold text-red-500">Time to take your medicine!</span>;
  }

  return (
    <span className="text-sm text-muted-foreground">
      in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
}