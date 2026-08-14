import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/nexo/EmptyState";
import { Rating } from "@/components/nexo/Rating";
import { useNexoStore } from "@/lib/nexo-store";
import { formatFee, getInstitution, type Institution } from "@/data/institutions";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare institutions — NEXO" },
      {
        name: "description",
        content: "Compare up to four institutions side by side on fees, ratings, courses, facilities and placement.",
      },
      { property: "og:title", content: "Compare institutions — NEXO" },
      {
        property: "og:description",
        content: "Compare institutions on fees, ratings, courses, facilities, hostel and placement.",
      },
      { property: "og:url", content: "/compare" },
    ],
    links: [{ rel: "canonical", href: "/compare" }],
  }),
  component: ComparePage,
});

const rows: { label: string; render: (i: Institution) => React.ReactNode }[] = [
  { label: "Location", render: (i) => `${i.city}, ${i.state}` },
  { label: "Type", render: (i) => i.type },
  { label: "Rating", render: (i) => <Rating value={i.rating} reviews={i.reviews} /> },
  {
    label: "Courses",
    render: (i) => (
      <ul className="space-y-1">
        {i.courses.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
    ),
  },
  {
    label: "Fees",
    render: (i) => (
      <ul className="space-y-1 tabular-nums">
        {i.courses.map((c) => (
          <li key={c.name} className="text-muted-foreground">
            <span className="text-foreground">{formatFee(c.fee)}</span> · {c.name}
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: "Eligibility",
    render: (i) => (
      <ul className="space-y-1 text-muted-foreground">
        {i.courses.map((c) => (
          <li key={c.name}>
            {c.name}: {c.eligibility}
          </li>
        ))}
      </ul>
    ),
  },
  { label: "Hostel", render: (i) => i.hostel },
  { label: "Facilities", render: (i) => i.facilities.join(", ") },
  { label: "Placement", render: (i) => i.placement },
  { label: "Admission", render: (i) => i.admission },
];

function ComparePage() {
  const { compare, removeCompare, clearCompare, hydrated } = useNexoStore();
  const items = compare.map(getInstitution).filter(Boolean) as Institution[];

  return (
    <div className="container-nexo py-10 md:py-14">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Compare</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="eyebrow">Side by side</p>
          <h1 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Compare institutions</h1>
          <p className="mt-3 text-muted-foreground">
            Add 2–4 institutions and read the differences that actually matter.
          </p>
        </div>
        {items.length > 0 && (
          <Button variant="ghost" onClick={clearCompare}>
            Clear all
          </Button>
        )}
      </header>

      <div className="mt-10">
        {!hydrated ? (
          <div className="h-64 animate-pulse rounded-xl border border-border bg-surface/50" />
        ) : items.length === 0 ? (
          <EmptyState
            title="Nothing to compare yet"
            description="Add institutions from the explore page or any institution profile to see them side by side."
            action={
              <Button asChild>
                <Link to="/explore" search={{ q: "", type: "all" }}>
                  Explore institutions
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr>
                  <th scope="col" className="w-40 border-b border-border bg-surface/60 p-4 text-left align-top">
                    <span className="eyebrow">Institution</span>
                  </th>
                  {items.map((i) => (
                    <th
                      key={i.slug}
                      scope="col"
                      className="min-w-[220px] border-b border-l border-border bg-surface/60 p-4 text-left align-top"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <img
                            src={i.images[0]}
                            alt=""
                            loading="lazy"
                            className="mb-3 aspect-[16/10] w-full rounded-lg object-cover"
                          />
                          <Link
                            to="/institution/$slug"
                            params={{ slug: i.slug }}
                            className="font-display text-base font-semibold hover:underline"
                          >
                            {i.name}
                          </Link>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${i.name} from comparison`}
                          onClick={() => removeCompare(i.slug)}
                          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="align-top">
                    <th scope="row" className="border-b border-border bg-surface/30 p-4 text-left font-medium">
                      {row.label}
                    </th>
                    {items.map((i) => (
                      <td key={i.slug} className="border-b border-l border-border p-4">
                        {row.render(i)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
