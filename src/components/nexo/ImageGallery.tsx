import { useState } from "react";
import { cn } from "@/lib/utils";

export function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-border">
        <img
          src={images[active]}
          alt={`${name} — image ${active + 1}`}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            onClick={() => setActive(idx)}
            aria-label={`Show image ${idx + 1}`}
            aria-current={idx === active}
            className={cn(
              "overflow-hidden rounded-lg border transition-colors",
              idx === active ? "border-border-strong" : "border-border opacity-60 hover:opacity-100",
            )}
          >
            <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
