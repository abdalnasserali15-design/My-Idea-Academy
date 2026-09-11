import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { resolveCourseMediaUrl } from "@/lib/courses-data";

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mb-3 mt-8 text-lg font-bold text-foreground sm:text-xl">
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 ms-1 list-none space-y-1.5">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="flex gap-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--neon)]" />
      <span>{children}</span>
    </li>
  ),
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <span className="my-5 block overflow-hidden rounded-2xl border border-border bg-card/50">
        <img
          src={resolveCourseMediaUrl(src)}
          alt={alt ?? ""}
          loading="lazy"
          className="w-full"
        />
      </span>
    );
  },
};

export function LessonMarkdown({ content }: { content: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
