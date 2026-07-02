import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

function youtubeId(u: string): string | null {
  const m = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 font-heading text-2xl font-bold text-ohaus-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 font-heading text-xl font-bold text-ohaus-ink">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 leading-relaxed text-ohaus-ink/90">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-4 border-l-4 border-ohaus-red pl-4 italic text-ohaus-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-1 pl-6 text-ohaus-ink/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-1 pl-6 text-ohaus-ink/90">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-ohaus-red underline hover:text-ohaus-red-dark"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <span className="relative mt-6 block aspect-video w-full overflow-hidden bg-ohaus-bg-soft">
        <Image
          src={urlFor(value as any).width(1000).url()}
          alt={value?.alt || ""}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-contain"
        />
      </span>
    ),
    videoEmbed: ({ value }) => {
      const yt = value?.url ? youtubeId(value.url) : null;
      if (yt) {
        return (
          <span className="relative mt-6 block aspect-video w-full overflow-hidden">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${yt}`}
              title="Видео"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </span>
        );
      }
      return (
        <a
          href={value?.url}
          className="mt-4 inline-block text-ohaus-red underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Смотреть видео
        </a>
      );
    },
  },
};

export default function PortableBody({ value }: { value: unknown[] }) {
  return <PortableText value={value as any} components={components} />;
}
