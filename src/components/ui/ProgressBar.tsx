'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showValue?: boolean;
  animated?: boolean;
}

export default function ProgressBar({ 
  value, 
  max = 5, 
  className, 
  showValue = false, 
  animated = true 
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
        {animated ? (
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ) : (
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      
      {showValue && (
        <span className="text-sm font-medium text-gray-400 min-w-[2rem]">
          {value}/{max}
        </span>
      )}
    </div>
  );
}
