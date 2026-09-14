import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

/**
 * Reusable CSS Grid-based expand/collapse container.
 * Animates smoothly between 0fr and 1fr without requiring JavaScript height calculations.
 */
export const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ isOpen, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          className
        )}
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        {...props}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    );
  }
);
CollapsibleContent.displayName = 'CollapsibleContent';
