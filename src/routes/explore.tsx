import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchBar } from "@/components/nexo/SearchBar";
import { FilterPanel, defaultFilters, type Filters } from "@/components/nexo/FilterPanel";
import { InstitutionCard, InstitutionCardSkeleton } from "@/components/nexo/InstitutionCard";
import { EmptyState } from "@/components/nexo/EmptyState";
import { institutions } from "@/data/institutions";

type ExploreSearch = { q: string; type: string };

export const Route = createFileRoute("/explore")({
  validateSearch: (search: Record<string, unknown>): ExploreSearch => ({
    q: typeof search["q"] === "string" ? (search["q"] as string) : "",
    type: typeof search["type"] === "string" ? (search["type"] as string) : "all",
  }),
  head: () => ({
    meta: [
      { title: "Explore institutions — NEXO" },
      {
        name: "description",
        content:
          "Search and filter schools, colleges and universities by location, course, fees, rating and facilities.",
      },
      { property: "og:title", content: "Explore institutions — NEXO" },
      {
        property: "og:description",
        content: "Search and filter institutions by location, course, fees, rating and facilities.",
      },
      { property: "og:url", content: "/explore" },
    ],
    links: [{ rel: "canonical", href: "/explore" }],
  }),
  component: ExplorePage,
});

const PAGE_SIZE = 6;

function ExplorePage() {
  const { q, type } = Route.useSearch();
  const navigate = useNavigate({ from: "/explore" });

  const [query, setQuery] = useState(q);
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters, type });
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFilters((f) => ({ ...f, type }));
    setQuery(q);
  }, [type, q]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [query, filters, sort]);

  useEffect(() => setPage(1), [query, filters, sort]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    let list = institutions.filter((i) => {
      if (term) {
        const haystack = `${i.name} ${i.city} ${i.state} ${i.type} ${i.courses.map((c) => c.name).join(" ")}`;
        if (!haystack.toLowerCase().includes(term)) return false;
      }
      if (filters.type !== "all" && i.type !== filters.type) return false;
      if (filters.city !== "all" && i.city !== filters.city) return false;
      if (filters.course !== "all" && !i.courses.some((c) => c.name === filters.course)) return false;
      if (i.startingFee > filters.maxFee) return false;
      if (i.rating < filters.minRating) return false;
      if (filters.facilities.length && !filters.facilities.every((f) => i.facilities.includes(f))) return false;
      return true;
    });

    list = [...list];
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "fees") list.sort((a, b) => a.startingFee - b.startingFee);
    if (sort === "popularity") list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [query, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const panel = (
    <FilterPanel
      filters={filters}
      onChange={(next) => {
        setFilters(next);
        navigate({ search: (prev) => ({ ...prev, type: next.type }), replace: true });
      }}
      onReset={() => {
        setFilters(defaultFilters);
        setQuery("");
        navigate({ search: { q: "", type: "all" }, replace: true });
      }}
    />
  );

  return (
    <div className="container-nexo py-10 md:py-14">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Explore</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="max-w-2xl">
        <p className="eyebrow">Discovery</p>
        <h1 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Explore institutions</h1>
        <p className="mt-3 text-muted-foreground">
          Narrow thousands of schools, colleges and universities down to the handful worth your attention.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <SearchBar value={query} onChange={setQuery} className="flex-1" />
        <div className="flex gap-3">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-12 w-full min-w-40 sm:w-48" aria-label="Sort results">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="fees">Fees: low to high</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 gap-2 lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto border-border bg-surface p-6">
              <SheetTitle className="sr-only">Filters</SheetTitle>
              <div className="mt-6">{panel}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-border bg-surface/50 p-6">{panel}</div>
        </aside>

        <section aria-live="polite">
          <p className="mb-5 text-sm text-muted-foreground">
            {loading ? "Searching…" : `${results.length} institution${results.length === 1 ? "" : "s"} found`}
          </p>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <InstitutionCardSkeleton key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilters(defaultFilters);
                    setQuery("");
                  }}
                >
                  Clear all filters
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((i) => (
                  <InstitutionCard key={i.slug} institution={i} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination className="mt-12">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        aria-disabled={current === 1}
                        className={current === 1 ? "pointer-events-none opacity-40" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(current - 1);
                        }}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <PaginationItem key={idx}>
                        <PaginationLink
                          href="#"
                          isActive={idx + 1 === current}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(idx + 1);
                          }}
                        >
                          {idx + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        aria-disabled={current === totalPages}
                        className={current === totalPages ? "pointer-events-none opacity-40" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(current + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
