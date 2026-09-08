import Link from "next/link";
import { cx } from "@/lib/format";

type Variant = "primary" | "secondary" | "gold" | "ghost" | "text" | "onDark";
type Size = "md" | "sm" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-subtle font-sans font-medium uppercase tracking-[0.08em] " +
  "transition-[background-color,color,border-color,opacity] duration-[350ms] ease-lux " +
  "disabled:cursor-not-allowed disabled:opacity-45 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-black hover:bg-gold-light",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-background",
  gold: "bg-gold text-black hover:bg-gold-light",
  ghost: "border border-line text-ink hover:border-gold hover:text-gold",
  onDark: "border border-white/45 text-white hover:bg-white hover:text-black",
  text: "px-0 text-ink underline underline-offset-[6px] decoration-[0.5px] hover:decoration-gold hover:text-gold",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-5 text-[11px]",
  md: "h-[52px] px-7 text-[12px]",
  lg: "h-[58px] px-9 text-[12px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type LinkButtonProps = CommonProps &
  Omit<React.ComponentProps<typeof Link>, "className" | "children">;

function classes({ variant = "primary", size = "md", fullWidth, className }: CommonProps) {
  return cx(
    base,
    variants[variant],
    variant === "text" ? "h-auto text-[12px]" : sizes[size],
    fullWidth && "w-full",
    className,
  );
}

export function Button({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={classes({ variant, size, fullWidth, className, children })} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={classes({ variant, size, fullWidth, className, children })} {...props}>
      {children}
    </Link>
  );
}
