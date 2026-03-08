import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-[12.5px] font-semibold transition-all cursor-pointer whitespace-nowrap border border-transparent focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:   'bg-gold text-text-2 border-gold hover:bg-gold-2',
        ghost:     'bg-transparent text-muted border-border2 hover:bg-[#e8e2d8] hover:text-text-2',
        danger:    'bg-red/10 text-red border-red/25 hover:bg-red/15',
        secondary: 'bg-white text-text-2 border-border2 hover:border-border3 hover:bg-bg',
      },
      size: {
        default: 'h-8 px-[14px]',
        sm:      'h-7 px-[10px] text-[11.5px] rounded-[7px]',
        lg:      'h-10 px-5 text-sm rounded-[10px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;
