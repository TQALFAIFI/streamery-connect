
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = ({
  children,
  className,
  hoverEffect = true,
  ...props
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        'glass-card animate-scale-in transition-all duration-300',
        hoverEffect && 'hover:shadow-lg hover:border-white/20 hover:bg-stream-glass/80',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
