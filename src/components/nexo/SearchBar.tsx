import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  label?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Search schools, colleges, universities...",
  className,
  id = "nexo-search",
  label = "Search institutions",
}: Props) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-lg border-border bg-surface pl-11 text-base placeholder:text-muted-foreground focus-visible:border-border-strong"
      />
    </div>
  );
}
