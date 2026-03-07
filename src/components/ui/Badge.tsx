import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("badge", {
  variants: {
    variant: {
      green: "badge-green",
      gold: "badge-gold",
      red: "badge-red",
      blue: "badge-blue",
      orange: "badge-orange",
    },
  },
  defaultVariants: { variant: "blue" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export default Badge;
