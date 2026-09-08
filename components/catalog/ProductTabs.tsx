"use client";

import { useState } from "react";
import { FileText, Download } from "lucide-react";
import SanityImg from "@/components/ui/SanityImg";
import { cn } from "@/lib/utils";
import type { Feature, DocFile, Spec, Detail } from "@/sanity/lib/queries";

type TabKey = "features" | "specs" | "documents" | "description";

function formatSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
  return `${Math.round(bytes / 1024)} КБ`;
}

/** Список «параметр — значение»: одинаково для характеристик и описания. */
function PairList({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="max-w-3xl divide-y divide-ohaus-line border-y border-ohaus-line">
      {rows.map((r, i) => (
        <div
          key={i}
          className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
        >
          <dt className="text-sm text-ohaus-muted">{r.label}</dt>
          <dd className="text-sm font-semibold text-ohaus-ink sm:col-span-2">
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProductTabs({
  productName,
  features,
  specs,
  documents,
  details,
  description,
}: {
  productName: string;
  features: Feature[];
  specs: Spec[];
  documents: DocFile[];
  details: Detail[];
  description: React.ReactNode;
}) {
  // «Документы» показываем всегда: раздел предусмотрен, файлы добавят позже.
  const tabs: { key: TabKey; label: string; show: boolean }[] = [
    { key: "features", label: "Особенности", show: features.length > 0 },
    { key: "specs", label: "Характеристики", show: specs.length > 0 },
    { key: "documents", label: "Документы", show: true },
    {
      key: "description",
      label: "Описание",
      show: details.length > 0 || Boolean(description),
    },
  ];
  const available = tabs.filter((t) => t.show);
  const [active, setActive] = useState<TabKey>(
    available[0]?.key ?? "documents",
  );

  if (available.length === 0) return null;

  return (
    <section className="mt-12">
      {/* Полоса вкладок */}
      <div
        role="tablist"
        aria-label="Информация о товаре"
        className="flex flex-wrap gap-6 border-b border-ohaus-line bg-ohaus-gray-dark px-4"
      >
        {available.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={active === t.key}
            aria-controls={`panel-${t.key}`}
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

      {/*
        Все панели всегда в разметке, неактивные скрыты атрибутом hidden.
        Раньше неактивная вкладка не рендерилась вовсе — из-за этого
        характеристики и вкладка «Описание» не попадали в HTML страницы
        и не индексировались поисковиками.
      */}
      <div className="py-8">
        <div
          role="tabpanel"
          id="panel-features"
          aria-labelledby="tab-features"
          hidden={active !== "features"}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={i} className="text-center">
                {f.image?.asset ? (
                  <div className="relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden bg-ohaus-bg-soft">
                    <SanityImg
                      image={f.image}
                      alt={`${productName} — особенность ${i + 1}`}
                      sizes="300px"
                      className="object-contain"
                      width={400}
                    />
                  </div>
                ) : null}
                {f.text ? (
                  <p className="text-ohaus-ink/90 mt-3 text-sm leading-relaxed">
                    {f.text}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div
          role="tabpanel"
          id="panel-specs"
          aria-labelledby="tab-specs"
          hidden={active !== "specs"}
        >
          <PairList rows={specs} />
        </div>

        <div
          role="tabpanel"
          id="panel-documents"
          aria-labelledby="tab-documents"
          hidden={active !== "documents"}
        >
          {documents.length > 0 ? (
            <ul className="max-w-3xl divide-y divide-ohaus-line border-y border-ohaus-line">
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
          ) : (
            <p className="text-sm text-ohaus-muted">
              Документация по этой модели готовится. Запросите её у нас —
              пришлём в ответ на обращение.
            </p>
          )}
        </div>

        <div
          role="tabpanel"
          id="panel-description"
          aria-labelledby="tab-description"
          hidden={active !== "description"}
        >
          <div className="space-y-6">
            {description ? (
              <div className="max-w-3xl">{description}</div>
            ) : null}
            {details.length > 0 ? <PairList rows={details} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
