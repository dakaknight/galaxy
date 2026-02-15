import React, { useMemo } from "react";

export default function FilterPanel({ data, filters, setFilters }) {
  const countries = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.country)))],
    [data]
  );
  const platforms = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.platform)))],
    [data]
  );
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.category)))],
    [data]
  );

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>

      <label className="block text-xs text-zinc-400">Country</label>
      <select
        value={filters.country}
        onChange={(e) =>
          setFilters((f) => ({ ...f, country: e.target.value }))
        }
        className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-sm"
      >
        {countries.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <label className="block text-xs text-zinc-400">Platform</label>
      <select
        value={filters.platform}
        onChange={(e) =>
          setFilters((f) => ({ ...f, platform: e.target.value }))
        }
        className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-sm"
      >
        {platforms.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <label className="block text-xs text-zinc-400">Category</label>
      <select
        value={filters.category}
        onChange={(e) =>
          setFilters((f) => ({ ...f, category: e.target.value }))
        }
        className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-sm"
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <div className="pt-2">
        <label className="block text-xs text-zinc-400">Followers Range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.minFollowers}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                minFollowers: Number(e.target.value || 0),
              }))
            }
            className="w-1/2 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-sm"
            placeholder="Min"
          />
          <input
            type="number"
            value={filters.maxFollowers}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                maxFollowers: Number(e.target.value || 0),
              }))
            }
            className="w-1/2 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-sm"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
}
