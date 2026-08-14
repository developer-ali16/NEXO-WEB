import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useNexoStore } from "@/lib/nexo-store";

export function FavouriteButton({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const { favourites, toggleFavourite } = useNexoStore();
  const active = favourites.includes(slug);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from saved` : `Save ${name}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavourite(slug);
        toast(active ? "Removed from saved" : "Saved", { description: name });
      }}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur transition-colors hover:border-border-strong hover:bg-surface-elevated",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4", active ? "fill-current text-foreground" : "text-muted-foreground")} />
    </button>
  );
}
