import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ImageGallery } from "@/components/nexo/ImageGallery";
import { Rating } from "@/components/nexo/Rating";
import { CompareButton } from "@/components/nexo/CompareButton";
import { FavouriteButton } from "@/components/nexo/FavouriteButton";
import { formatFee, getInstitution } from "@/data/institutions";

export const Route = createFileRoute("/institution/$slug")({
  loader: ({ params }) => {
    const institution = getInstitution(params.slug);
    if (!institution) throw notFound();
    return { institution };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Institution unavailable — NEXO" }, { name: "robots", content: "noindex" }] };
    }
    const i = loaderData.institution;
    const title = `${i.name} — ${i.type} in ${i.city} | NEXO`;
    return {
      meta: [
        { title },
        { name: "description", content: i.description },
        { property: "og:title", content: title },
        { property: "og:description", content: i.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/institution/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/institution/${params.slug}` }],
    };
  },
  component: InstitutionPage,
});

function InstitutionPage() {
  const { institution: i } = Route.useLoaderData();

  return (
    <div className="container-nexo py-10 md:py-14">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/explore">Explore</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{i.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <ImageGallery images={i.images} name={i.name} />

        <div className="lg:sticky lg:top-24">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="border border-border">
              {i.type}
            </Badge>
            <span className="text-sm text-muted-foreground">Est. {i.established}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold md:text-4xl">{i.name}</h1>
          <p className="mt-3 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {i.city}, {i.state}
          </p>
          <div className="mt-4">
            <Rating value={i.rating} reviews={i.reviews} size="md" />
          </div>
          <p className="mt-5 text-muted-foreground">{i.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface/50 p-5">
            <div>
              <dt className="eyebrow">Starting fee</dt>
              <dd className="mt-1 font-medium tabular-nums">{formatFee(i.startingFee)}</dd>
            </div>
            <div>
              <dt className="eyebrow">Courses offered</dt>
              <dd className="mt-1 font-medium">{i.courses.length}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CompareButton slug={i.slug} name={i.name} size="default" />
            <Button asChild variant="outline">
              <a href={i.website} target="_blank" rel="noreferrer noopener" className="gap-2">
                Official website
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <FavouriteButton slug={i.slug} name={i.name} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-14">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-surface/60 p-1">
          {["overview", "courses", "admission", "facilities", "placement", "contact"].map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-8 max-w-3xl space-y-4">
          <h2 className="font-display text-xl font-semibold">About {i.name}</h2>
          <p className="text-muted-foreground">{i.about}</p>
          <p className="text-muted-foreground">{i.description}</p>
        </TabsContent>

        <TabsContent value="courses" className="mt-8">
          <h2 className="font-display text-xl font-semibold">Courses & fees</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {i.courses.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-border-strong"
              >
                <h3 className="font-display text-base font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.duration}</p>
                <div className="mt-4 flex items-end justify-between gap-4 border-t border-border pt-4">
                  <div>
                    <p className="eyebrow">Eligibility</p>
                    <p className="mt-1 text-sm text-muted-foreground">{c.eligibility}</p>
                  </div>
                  <p className="whitespace-nowrap font-medium tabular-nums">{formatFee(c.fee)}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="admission" className="mt-8 max-w-3xl space-y-4">
          <h2 className="font-display text-xl font-semibold">Admission information</h2>
          <p className="text-muted-foreground">{i.admission}</p>
          <h3 className="pt-2 font-display text-base font-semibold">Eligibility by course</h3>
          <ul className="space-y-2 text-muted-foreground">
            {i.courses.map((c) => (
              <li key={c.name} className="border-b border-border pb-2">
                <span className="text-foreground">{c.name}</span> — {c.eligibility}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="facilities" className="mt-8 max-w-3xl space-y-6">
          <div>
            <h2 className="font-display text-xl font-semibold">Facilities</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {i.facilities.map((f) => (
                <Badge key={f} variant="outline" className="border-border px-3 py-1 text-sm font-normal">
                  {f}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-base font-semibold">Hostel</h3>
            <p className="mt-2 text-muted-foreground">{i.hostel}</p>
          </div>
        </TabsContent>

        <TabsContent value="placement" className="mt-8 max-w-3xl space-y-4">
          <h2 className="font-display text-xl font-semibold">Placement</h2>
          <p className="text-muted-foreground">{i.placement}</p>
        </TabsContent>

        <TabsContent value="contact" className="mt-8 max-w-3xl space-y-4">
          <h2 className="font-display text-xl font-semibold">Contact</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4" />
              {i.city}, {i.state}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4" />
              <a href={`tel:${i.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                {i.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${i.email}`} className="hover:text-foreground">
                {i.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <ExternalLink className="h-4 w-4" />
              <a href={i.website} target="_blank" rel="noreferrer noopener" className="hover:text-foreground">
                {i.website}
              </a>
            </li>
          </ul>
        </TabsContent>
      </Tabs>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface/50 p-6">
        <p className="text-muted-foreground">Still deciding? Put this institution next to others.</p>
        <Button asChild variant="outline">
          <Link to="/compare">Go to compare</Link>
        </Button>
      </div>
    </div>
  );
}
