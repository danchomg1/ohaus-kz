"use client";

import { useState } from "react";
import { FileText, Download } from "lucide-react";
import SanityImg from "@/components/ui/SanityImg";
import { cn } from "@/lib/utils";
import type { Feature, DocFile } from "@/sanity/lib/queries";

type TabKey = "features" | "documents" | "description";

function formatSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
  return `${Math.round(bytes / 1024)} КБ`;
}

export default function ProductTabs({
  features,
  documents,
  description,
}: {
  features: Feature[];
  documents: DocFile[];
  description: React.ReactNode;
}) {
  const tabs: { key: TabKey; label: string; show: boolean }[] = [
    { key: "features", label: "Особенности", show: features.length > 0 },
    { key: "documents", label: "Документы", show: documents.length > 0 },
    {
      key: "description",
      label: "Описание",
      show: Boolean(description),
    },
  ];
  const available = tabs.filter((t) => t.show);
  const [active, setActive] = useState<TabKey>(
    available[0]?.key ?? "features",
  );

  if (available.length === 0) return null;

  return (
    <section className="mt-12">
      {/* Полоса вкладок */}
      <div className="flex flex-wrap gap-6 border-b border-ohaus-line bg-ohaus-gray-dark px-4">
        {available.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(t.key)}
            className={cn(
              "-mb-px border-b-2 py-4 font-heading text-sm font-bold uppercase tracking-wide transition-colors",
              active === t.key
                ? "border-ohaus-red text-white"
                : "border-transparent text-white/60 hover:text-white",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="py-8">
        {active === "features" ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={i} className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden bg-ohaus-bg-soft">
                  {f.image?.asset ? (
                    <SanityImg
                      image={f.image}
                      alt={f.text || ""}
                      sizes="300px"
                      className="object-contain"
                      width={400}
                    />
                  ) : null}
                </div>
                {f.text ? (
                  <p className="mt-3 text-sm leading-relaxed text-ohaus-ink/90">
                    {f.text}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        {active === "documents" ? (
          <ul className="divide-y divide-ohaus-line border-y border-ohaus-line">
            {documents.map((d, i) => (
              <li key={i}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 transition-colors hover:text-ohaus-red"
                >
                  <FileText
                    className="h-5 w-5 flex-shrink-0 text-ohaus-red"
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-sm">{d.title}</span>
                  <span className="text-xs uppercase text-ohaus-muted">
                    {d.ext} {formatSize(d.size)}
                  </span>
                  <Download
                    className="h-4 w-4 text-ohaus-muted"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        {active === "description" ? (
          <div className="max-w-3xl">{description}</div>
        ) : null}
      </div>
    </section>
  );
}
