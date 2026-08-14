import { Link } from "@tanstack/react-router";
import { BookOpen, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CompareButton } from "./CompareButton";
import { FavouriteButton } from "./FavouriteButton";
import { Rating } from "./Rating";
import { formatFee, type Institution } from "@/data/institutions";

export function InstitutionCard({ institution }: { institution: Institution }) {
  const i = institution;
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={i.images[0]}
          alt={`${i.name} campus`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 overlay-card" aria-hidden />
        <Badge variant="secondary" className="absolute left-3 top-3 border border-border">
          {i.type}
        </Badge>
        <FavouriteButton slug={i.slug} name={i.name} className="absolute right-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-semibold leading-snug">
            <Link to="/institution/$slug" params={{ slug: i.slug }} className="hover:underline">
              {i.name}
            </Link>
          </h3>
          <Rating value={i.rating} />
        </div>

        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {i.city}, {i.state}
        </p>

        <p className="line-clamp-2 text-sm text-muted-foreground">{i.description}</p>

        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
          <div>
            <p className="eyebrow">Starting fee</p>
            <p className="mt-1 font-medium tabular-nums">{formatFee(i.startingFee)}</p>
          </div>
          <div>
            <p className="eyebrow">Courses</p>
            <p className="mt-1 flex items-center gap-1.5 font-medium">
              <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
              {i.courses.length}
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <Button asChild size="sm" className="flex-1">
            <Link to="/institution/$slug" params={{ slug: i.slug }}>
              View details
            </Link>
          </Button>
          <CompareButton slug={i.slug} name={i.name} />
        </div>
      </div>
    </article>
  );
}

export function InstitutionCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-3">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </div>
  );
}
