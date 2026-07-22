import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'max';
}

const sizeMap = {
  sm: 'max-w-2xl',     // 640px
  md: 'max-w-3xl',     // 768px
  lg: 'max-w-5xl',     // 1024px
  xl: 'max-w-7xl',     // 1280px
  max: 'max-w-[1440px]',// 1440px
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'max', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12',
          sizeMap[size],
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';
