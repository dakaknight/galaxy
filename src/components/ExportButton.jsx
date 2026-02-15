import React from "react";
import jsPDF from "jspdf";

export default function ExportButton({ shortlist }) {
  const exportPDF = async () => {
    if (!shortlist.length) return alert("Shortlist is empty");

    const doc = new jsPDF({ orientation: "landscape", format: "a4" });

    const img = new Image();
    img.src = "/assets/swangz_logo.png";
    await new Promise((res) => {
      img.onload = res;
    });

    shortlist.forEach((inf, i) => {
      if (i > 0) doc.addPage();

      // Black background
      doc.setFillColor("#000000");
      doc.rect(0, 0, 297, 210, "F");

      // Logo
      doc.addImage(img, "PNG", 255, 10, 30, 20);

      // Text
      doc.setTextColor("#FFFFFF");
      doc.setFontSize(18);
      doc.text(`@${inf.name}`, 15, 22);
      doc.setFontSize(11);
      doc.text(`Platform: ${inf.platform}`, 15, 38);
      doc.text(`Country: ${inf.country}`, 15, 48);
      doc.text(`Category: ${inf.category}`, 15, 58);
      doc.text(`Followers: ${inf.followers.toLocaleString()}`, 15, 68);
      doc.text(`Engagement: ${inf.engagement_rate}%`, 15, 78);
      doc.text(`Brand Fit Score: ${inf.brand_fit_score}`, 15, 88);
      doc.text(`Tags: ${(inf.tags || []).join(", ")}`, 15, 98);

      // Footer
      doc.setDrawColor("#b78e3c");
      doc.setLineWidth(0.8);
      doc.line(12, 190, 285, 190);
      doc.setTextColor("#b78e3c");
      doc.setFontSize(10);
      doc.text("Influencer Galaxy • Swangz Digital Intelligence MVP", 15, 198);
    });

    const fname = `Swangz_Influencer_Pitch_${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`;
    doc.save(fname);
  };

  return (
    <button
      onClick={exportPDF}
      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm hover:bg-zinc-800 transition"
    >
      Export Pitch (PDF • 16:9)
    </button>
  );
}
