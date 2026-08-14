import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title = "No institutions found",
  description = "Try adjusting your search or filters to see more results.",
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/40 px-6 py-20 text-center">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface">
        <SearchX className="h-5 w-5 text-muted-foreground" />
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
