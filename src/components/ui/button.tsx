'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-base font-semibold cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3565F2]/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-[#3565F2] text-white shadow-[0_8px_24px_-6px_rgba(53,101,242,0.4)] hover:bg-[#3D79F2] hover:shadow-[0_12px_32px_-6px_rgba(53,101,242,0.5)]',
        secondary:
          'bg-[#F2F7FE] text-[#3565F2] border border-[#3565F2]/20 hover:bg-[#E5F0FE] hover:border-[#3565F2]/40',
        outline:
          'bg-white text-[#0F172A] border border-[#E2E8F0] shadow-sm hover:border-[#3565F2]/50 hover:bg-[#FAFCFF] hover:text-[#3565F2]',
        ghost:
          'bg-transparent text-[#0F172A] hover:bg-[#F2F7FE] hover:text-[#3565F2]',
        cyan:
          'bg-[#CEF2F2] text-[#0F172A] font-bold shadow-sm hover:bg-[#b8eded]',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-md',
        md: 'h-11 px-6 text-base rounded-xl',
        lg: 'h-13 px-8 text-lg rounded-xl',
        pill: 'h-12 px-7 text-base rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
