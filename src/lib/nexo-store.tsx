import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const FAV_KEY = "nexo:favourites";
const CMP_KEY = "nexo:compare";
export const MAX_COMPARE = 4;

type StoreValue = {
  favourites: string[];
  compare: string[];
  hydrated: boolean;
  toggleFavourite: (slug: string) => void;
  toggleCompare: (slug: string) => boolean;
  removeCompare: (slug: string) => void;
  clearCompare: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function read(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function NexoStoreProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavourites(read(FAV_KEY));
    setCompare(read(CMP_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(FAV_KEY, JSON.stringify(favourites));
  }, [favourites, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CMP_KEY, JSON.stringify(compare));
  }, [compare, hydrated]);

  const toggleFavourite = useCallback((slug: string) => {
    setFavourites((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const toggleCompare = useCallback((slug: string) => {
    let ok = true;
    setCompare((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) {
        ok = false;
        return prev;
      }
      return [...prev, slug];
    });
    return ok;
  }, []);

  const removeCompare = useCallback((slug: string) => {
    setCompare((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clearCompare = useCallback(() => setCompare([]), []);

  const value = useMemo(
    () => ({ favourites, compare, hydrated, toggleFavourite, toggleCompare, removeCompare, clearCompare }),
    [favourites, compare, hydrated, toggleFavourite, toggleCompare, removeCompare, clearCompare],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useNexoStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useNexoStore must be used inside NexoStoreProvider");
  return ctx;
}
