import React, { useMemo } from "react";

export default function Charts({ data }) {
  // Top influencers by engagement
  const top = useMemo(
    () => [...data].sort((a, b) => b.engagement_rate - a.engagement_rate).slice(0, 5),
    [data]
  );

  // Platform distribution
  const platforms = useMemo(() => {
    const map = {};
    data.forEach((d) => {
      map[d.platform] = (map[d.platform] || 0) + 1;
    });
    return Object.entries(map);
  }, [data]);

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Quick Insights</h3>

      <div className="text-xs text-zinc-400">Top by engagement</div>
      <ul className="text-sm space-y-1">
        {top.map((t) => (
          <li key={t.id} className="flex justify-between">
            <span>@{t.name}</span>
            <span className="text-zinc-400">{t.engagement_rate}%</span>
          </li>
        ))}
      </ul>

      <div className="text-xs text-zinc-400 pt-2">Platform distribution</div>
      <ul className="text-sm space-y-1">
        {platforms.map(([p, c]) => (
          <li key={p} className="flex justify-between">
            <span>{p}</span>
            <span className="text-zinc-400">{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
