// src/components/loading-indicator.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingIndicatorProps {
  className?: string;
  text?: string;
}

export function LoadingIndicator({ className, text = "Analyzing your idea..." }: LoadingIndicatorProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2 text-muted-foreground", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {text && <p className="text-sm">{text}</p>}
    </div>
  );
}
