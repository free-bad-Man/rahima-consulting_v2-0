import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  animationDelay?: number;
  hover?: boolean;
}

export default function GlassCard({ 
  children, 
  className = '',
  animationDelay = 0,
  hover = true 
}: GlassCardProps) {
  return (
    <div 
      className={cn(
        "glassmorphism-card p-6 md:p-8 lg:p-10 animate-slide-up",
        hover && "hover-lift",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {children}
    </div>
  );
}

