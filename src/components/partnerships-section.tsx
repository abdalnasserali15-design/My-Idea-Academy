import { useTranslation } from "react-i18next";
import { Building2 } from "lucide-react";

const PLACEHOLDER_PARTNER_COUNT = 4;

export function PartnershipsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="partnerships"
      className="relative w-full scroll-mt-20 py-20 sm:py-28"
      aria-labelledby="partnerships-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--neon)]">
            {t("partnerships.kicker")}
          </span>
          <h2
            id="partnerships-heading"
            className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl"
          >
            {t("partnerships.sectionTitle")}
          </h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
            {t("partnerships.sectionSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: PLACEHOLDER_PARTNER_COUNT }, (_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card/40 p-6 text-center"
            >
              <Building2
                className="size-6 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-muted-foreground">
                {t("partnerships.placeholderLabel", { number: i + 1 })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
