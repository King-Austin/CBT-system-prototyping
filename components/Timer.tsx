
import React, { useState, useEffect } from 'react';
import ClockIcon from './icons/ClockIcon';

interface TimerProps {
  durationMinutes: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ durationMinutes, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timerColorClass = timeLeft < 60 ? 'text-red-500' : 'text-slate-700 dark:text-slate-300';

  return (
    <div className={`flex items-center gap-2 font-mono text-lg ${timerColorClass}`}>
      <ClockIcon className="h-5 w-5" />
      <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
};

export default Timer;
