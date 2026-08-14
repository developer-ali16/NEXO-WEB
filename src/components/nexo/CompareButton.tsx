import { Check, Scale } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MAX_COMPARE, useNexoStore } from "@/lib/nexo-store";
import { cn } from "@/lib/utils";

export function CompareButton({
  slug,
  name,
  className,
  size = "sm",
}: {
  slug: string;
  name: string;
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const { compare, toggleCompare } = useNexoStore();
  const active = compare.includes(slug);

  return (
    <Button
      type="button"
      variant={active ? "secondary" : "outline"}
      size={size}
      aria-pressed={active}
      className={cn("gap-2", className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const ok = toggleCompare(slug);
        if (!ok) {
          toast("Compare list is full", { description: `You can compare up to ${MAX_COMPARE} institutions.` });
          return;
        }
        toast(active ? "Removed from compare" : "Added to compare", { description: name });
      }}
    >
      {active ? <Check className="h-4 w-4" /> : <Scale className="h-4 w-4" />}
      {active ? "In compare" : "Compare"}
    </Button>
  );
}
