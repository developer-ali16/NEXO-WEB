import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allCourseNames, cities, facilityOptions, formatFee } from "@/data/institutions";

export type Filters = {
  type: string;
  city: string;
  course: string;
  maxFee: number;
  minRating: number;
  facilities: string[];
};

export const FEE_MAX = 800000;

export const defaultFilters: Filters = {
  type: "all",
  city: "all",
  course: "all",
  maxFee: FEE_MAX,
  minRating: 0,
  facilities: [],
};

export function FilterPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
}) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => onChange({ ...filters, [key]: value });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={onReset}>
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="f-type">Institution type</Label>
        <Select value={filters.type} onValueChange={(v) => set("type", v)}>
          <SelectTrigger id="f-type" className="w-full">
            <SelectValue placeholder="Any type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any type</SelectItem>
            <SelectItem value="School">School</SelectItem>
            <SelectItem value="College">College</SelectItem>
            <SelectItem value="University">University</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="f-city">Location</Label>
        <Select value={filters.city} onValueChange={(v) => set("city", v)}>
          <SelectTrigger id="f-city" className="w-full">
            <SelectValue placeholder="Any location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any location</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="f-course">Course</Label>
        <Select value={filters.course} onValueChange={(v) => set("course", v)}>
          <SelectTrigger id="f-course" className="w-full">
            <SelectValue placeholder="Any course" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            <SelectItem value="all">Any course</SelectItem>
            {allCourseNames.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="f-fee">Maximum fee</Label>
          <span className="text-sm tabular-nums text-muted-foreground">{formatFee(filters.maxFee)}</span>
        </div>
        <Slider
          id="f-fee"
          value={[filters.maxFee]}
          min={50000}
          max={FEE_MAX}
          step={10000}
          onValueChange={(v) => set("maxFee", v[0] ?? FEE_MAX)}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="f-rating">Minimum rating</Label>
          <span className="text-sm tabular-nums text-muted-foreground">
            {filters.minRating === 0 ? "Any" : `${filters.minRating.toFixed(1)}+`}
          </span>
        </div>
        <Slider
          id="f-rating"
          value={[filters.minRating]}
          min={0}
          max={5}
          step={0.5}
          onValueChange={(v) => set("minRating", v[0] ?? 0)}
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-3 text-sm font-medium">Facilities</legend>
        {facilityOptions.map((f) => {
          const id = `f-fac-${f.replace(/\s+/g, "-").toLowerCase()}`;
          const checked = filters.facilities.includes(f);
          return (
            <div key={f} className="flex items-center gap-3">
              <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(v) =>
                  set("facilities", v ? [...filters.facilities, f] : filters.facilities.filter((x) => x !== f))
                }
              />
              <Label htmlFor={id} className="text-sm font-normal text-muted-foreground">
                {f}
              </Label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
