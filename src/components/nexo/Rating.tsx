import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  reviews?: number;
  size?: "sm" | "md";
  className?: string;
};

export function Rating({ value, reviews, size = "sm", className }: Props) {
  const dim = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Star className={cn(dim, "fill-current text-foreground")} aria-hidden />
      <span className={cn("font-medium tabular-nums", size === "sm" ? "text-sm" : "text-base")}>
        {value.toFixed(1)}
      </span>
      {reviews !== undefined && (
        <span className="text-xs text-muted-foreground">({reviews.toLocaleString("en-IN")})</span>
      )}
      <span className="sr-only">out of 5</span>
    </div>
  );
}
