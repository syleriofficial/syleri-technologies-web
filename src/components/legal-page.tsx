import type { ReactNode } from "react";
import { Container } from "./ui/layout";

export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro: ReactNode; children: ReactNode }) {
  return (
    <Container className="pb-24 pt-14 sm:pt-20">
      <div className="max-w-[44rem]">
        <h1 className="type-title">{title}</h1>
        <p className="mt-4 text-[0.9375rem] text-muted">
          Last updated <time dateTime={updated}>{new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${updated}T00:00:00Z`))}</time>
        </p>
        <p className="type-lead mt-8">{intro}</p>
        <div className="prose-syleri mt-4">{children}</div>
      </div>
    </Container>
  );
}
