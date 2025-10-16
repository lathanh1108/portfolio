'use client';

import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  intensity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FloatingElement({
  children,
  duration = 6,
  delay = 0,
  intensity = 20,
  className = '',
  style
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        y: [0, -intensity, 0],
        rotate: [0, 1, -1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

interface FloatingIconsProps {
  className?: string;
}

export function FloatingIcons({ className = '' }: FloatingIconsProps) {
  const icons = [
    { icon: '⚡', delay: 0, duration: 8, x: '10%', y: '20%' },
    { icon: '🚀', delay: 2, duration: 10, x: '80%', y: '30%' },
    { icon: '💎', delay: 4, duration: 7, x: '20%', y: '70%' },
    { icon: '🎯', delay: 1, duration: 9, x: '70%', y: '80%' },
    { icon: '✨', delay: 3, duration: 6, x: '90%', y: '60%' },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {icons.map((item, index) => (
        <FloatingElement
          key={index}
          duration={item.duration}
          delay={item.delay}
          intensity={15}
          className="absolute text-2xl opacity-20"
          style={{
            left: item.x,
            top: item.y,
          }}
        >
          <span>{item.icon}</span>
        </FloatingElement>
      ))}
    </div>
  );
}
