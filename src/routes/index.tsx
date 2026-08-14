import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BarChart3, BookOpen, Compass, MapPin, ScrollText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchBar } from "@/components/nexo/SearchBar";
import { InstitutionCard } from "@/components/nexo/InstitutionCard";
import {
  cities,
  heroImage,
  institutions,
  popularCourses,
  typeImages,
  type InstitutionType,
} from "@/data/institutions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXO — Discover. Compare. Choose." },
      {
        name: "description",
        content:
          "Explore schools, colleges and universities in one place. Compare fees, ratings, courses, facilities and placement before you choose.",
      },
      { property: "og:title", content: "NEXO — Discover. Compare. Choose." },
      {
        property: "og:description",
        content: "A discovery platform for exploring and comparing schools, colleges and universities.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const types: { type: InstitutionType; blurb: string }[] = [
  { type: "School", blurb: "K–12 campuses with curriculum, boarding and co-curricular detail in one place." },
  { type: "College", blurb: "Undergraduate and postgraduate colleges across commerce, engineering, medicine and design." },
  { type: "University", blurb: "Multidisciplinary universities with research centres and residential campuses." },
];

const whyNexo = [
  { Icon: Compass, title: "Discover institutions", body: "Search a single, structured index instead of a dozen tabs." },
  { Icon: BarChart3, title: "Compare options", body: "Put up to four institutions side by side on what matters." },
  { Icon: BookOpen, title: "Explore courses & fees", body: "Course-wise fees and eligibility listed on every profile." },
  { Icon: ScrollText, title: "Make informed decisions", body: "Admission, hostel and placement information without the noise." },
];

const comparePoints = ["Fees", "Ratings", "Courses", "Facilities", "Hostel", "Placement", "Location"];

function Index() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");

  const featured = institutions.slice(0, 6);

  const submit = () => {
    navigate({ to: "/explore", search: { q: query.trim(), type } });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-16 flex min-h-[92vh] items-end overflow-hidden">
        <img
          src={heroImage}
          alt="University campus at dusk"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 overlay-hero" aria-hidden />
        <div className="container-nexo relative pb-20 pt-32">
          <p className="eyebrow">Discover. Compare. Choose.</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.08] md:text-6xl">
            Find the place where your next chapter begins.
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            NEXO brings schools, colleges and universities into one calm, comparable index — courses, fees,
            facilities and placement, without the sales pitch.
          </p>

          <form
            className="mt-10 max-w-4xl rounded-2xl border border-border bg-background/70 p-3 backdrop-blur-xl"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <div className="flex flex-col gap-3 lg:flex-row">
              <SearchBar value={query} onChange={setQuery} className="flex-1" id="hero-search" />
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="h-12 lg:w-44" aria-label="Location">
                  <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Location" />
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
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-12 lg:w-40" aria-label="Institution type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any type</SelectItem>
                  <SelectItem value="School">School</SelectItem>
                  <SelectItem value="College">College</SelectItem>
                  <SelectItem value="University">University</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" size="lg" className="h-12 gap-2">
                Explore Institutions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Explore by type */}
      <section className="container-nexo py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Explore by institution type</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Start where you are</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {types.map(({ type: t, blurb }) => (
            <Link
              key={t}
              to="/explore"
              search={{ q: "", type: t }}
              className="group relative overflow-hidden rounded-2xl border border-border transition-colors hover:border-border-strong"
            >
              <img
                src={typeImages[t]}
                alt={`${t} campus`}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 overlay-card" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-xl font-semibold">{t}s</h3>
                <p className="mt-2 text-sm text-muted-foreground">{blurb}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="border-y border-border bg-surface/30 py-20 md:py-28">
        <div className="container-nexo">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Featured institutions</p>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
                Profiles worth a closer look
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/explore" search={{ q: "", type: "all" }}>
                View all
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((i) => (
              <InstitutionCard key={i.slug} institution={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular courses */}
      <section className="container-nexo py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Popular courses</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Browse by what you want to study</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularCourses.map((c) => (
            <Link
              key={c.code}
              to="/explore"
              search={{ q: c.code, type: "all" }}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lift"
            >
              <p className="font-display text-lg font-semibold">{c.code}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.name}</p>
              <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">{c.duration}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Compare */}
      <section className="border-y border-border bg-surface/30 py-20 md:py-28">
        <div className="container-nexo grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Compare</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Not sure which one is right for you?
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Add two to four institutions and read the differences in one table — no tabs, no guessing.
            </p>
            <Button asChild size="lg" className="mt-8 gap-2">
              <Link to="/compare">
                Open compare
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {comparePoints.map((p) => (
              <li
                key={p}
                className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why NEXO */}
      <section className="container-nexo py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Why NEXO</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Built for one decision</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyNexo.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-elevated">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="mt-5 font-display text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-nexo pb-24">
        <div className="rounded-2xl border border-border bg-surface/50 px-8 py-16 text-center md:py-24">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold md:text-5xl">
            Your next chapter starts with the right choice.
          </h2>
          <Button asChild size="lg" className="mt-10 gap-2">
            <Link to="/explore" search={{ q: "", type: "all" }}>
              Explore NEXO
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
