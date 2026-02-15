import React from "react";

export default function Sidebar({ influencer, addToShortlist, shortlist }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Details</h2>
      {!influencer ? (
        <div className="text-zinc-400 text-sm">
          Click a dot on the map to view details
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">@{influencer.name}</div>
            <span className="text-xs px-2 py-1 rounded bg-zinc-800">
              {influencer.platform}
            </span>
          </div>
          <div className="text-sm text-zinc-300">
            Country: {influencer.country}
          </div>
          <div className="text-sm text-zinc-300">
            Category: {influencer.category}
          </div>
          <div className="text-sm text-zinc-300">
            Followers: {influencer.followers.toLocaleString()}
          </div>
          <div className="text-sm text-zinc-300">
            Engagement: {influencer.engagement_rate}%
          </div>
          <div className="text-sm text-zinc-300">
            Brand Fit Score: {influencer.brand_fit_score}
          </div>
          <div className="text-sm text-zinc-300">
            Tags: {(influencer.tags || []).join(" • ")}
          </div>
          <button
            onClick={() => addToShortlist(influencer)}
            className="mt-2 w-full bg-swangz-gold text-black font-semibold py-2 rounded hover:opacity-90 transition"
          >
            Add to Pitch
          </button>
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-semibold">Shortlist ({shortlist.length})</h3>
        <ul className="text-sm mt-2 space-y-1 max-h-40 overflow-auto pr-2">
          {shortlist.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between border-b border-zinc-800 py-1"
            >
              <span>@{s.name}</span>
              <span className="text-xs text-zinc-400">{s.platform}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
