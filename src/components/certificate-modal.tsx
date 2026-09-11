import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useTranslation } from "react-i18next";
import { X, Download, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import QRCode from "qrcode";

import { Logo } from "@/components/logo";
import { TOPICS } from "@/data/topics";
import { DIRECTOR_SIGNATURE_DATA_URL } from "@/assets/signature";

interface Props {
  open: boolean;
  onClose: () => void;
  recipientName: string;
  topicSlug?: string;
  courseTitle?: string;
  learningSummary?: string;
  score: number;
  certId: string | null;
}

const IVORY = "#FBF6EA";
const NAVY = "#0C2340";
const GOLD = "#B8860B";
const MUTED = "#6B6456";

export function CertificateModal({
  open,
  onClose,
  recipientName,
  topicSlug,
  courseTitle,
  learningSummary,
  score,
  certId,
}: Props) {
  const { t, i18n } = useTranslation();

  const topicTitle = useMemo(() => {
    if (courseTitle) return courseTitle;
    const topic = TOPICS.find((tp) => tp.slug === topicSlug);
    return topic
      ? i18n.getFixedT("en")(`topics.${topic.i18nKey}.title`)
      : (topicSlug ?? "");
  }, [topicSlug, courseTitle, i18n]);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [downloading, setDownloading] = useState(false);
  const dateStr = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [],
  );
  const cardRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !certId) return;
    const verifyUrl = `${window.location.origin}/verify/${certId}`;
    QRCode.toDataURL(verifyUrl, {
      width: 200,
      margin: 1,
      color: { dark: "#0C2340", light: "#ffffff" },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [open, certId]);

  if (!open) return null;

  const drawLogoBadge = (pdf: jsPDF, cx: number, cy: number, r: number) => {
    pdf.setDrawColor(12, 35, 64);
    pdf.setFillColor(17, 17, 17);
    pdf.circle(cx, cy, r, "F");

    pdf.saveGraphicsState();

    pdf.lines(
      [
        [r * 2, 0],
        [-r * 2, r * 2],
      ],
      cx - r,
      cy - r,
      [1, 1],
      null,
      true,
    );
    pdf.clip();
    pdf.discardPath();
    pdf.setFillColor(255, 255, 255);
    pdf.circle(cx, cy, r, "F");
    pdf.restoreGraphicsState();

    pdf.setDrawColor(17, 17, 17);
    pdf.setLineWidth(0.3);
    pdf.circle(cx, cy, r, "S");

    pdf.setTextColor(17, 17, 17);
    pdf.setFont("times", "bold");
    pdf.setFontSize(r * 3.4);
    pdf.text("A", cx - r * 0.42, cy - r * 0.1, { align: "center" });

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(r * 0.95);
    pdf.text("MY", cx + r * 0.42, cy + r * 0.28, { align: "center" });
    pdf.text("IDEA", cx + r * 0.42, cy + r * 0.62, { align: "center" });
  };

  const drawCornerOrnament = (
    pdf: jsPDF,
    x: number,
    y: number,
    hDir: 1 | -1,
    vDir: 1 | -1,
  ) => {
    const outer = 7;
    const inner = 5;
    pdf.setDrawColor(184, 134, 11);
    pdf.setLineWidth(0.7);
    pdf.line(x, y, x + outer * hDir, y);
    pdf.line(x, y, x, y + outer * vDir);
    pdf.setDrawColor(12, 35, 64);
    pdf.setLineWidth(0.35);
    const ix = x + 1.5 * hDir;
    const iy = y + 1.5 * vDir;
    pdf.line(ix, iy, ix + inner * hDir, iy);
    pdf.line(ix, iy, ix, iy + inner * vDir);
  };

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      const w = pdf.internal.pageSize.getWidth();
      const h = pdf.internal.pageSize.getHeight();

      pdf.setFillColor(251, 246, 234);
      pdf.rect(0, 0, w, h, "F");

      pdf.setDrawColor(184, 134, 11);
      pdf.setLineWidth(0.9);
      pdf.rect(6, 6, w - 12, h - 12);
      pdf.setDrawColor(12, 35, 64);
      pdf.setLineWidth(0.4);
      pdf.rect(9, 9, w - 18, h - 18);

      drawCornerOrnament(pdf, 9, 9, 1, 1);
      drawCornerOrnament(pdf, w - 9, 9, -1, 1);
      drawCornerOrnament(pdf, 9, h - 9, 1, -1);
      drawCornerOrnament(pdf, w - 9, h - 9, -1, -1);

      drawLogoBadge(pdf, 20, 20, 7);

      pdf.setFont("times", "bold");
      pdf.setFontSize(15);
      pdf.setTextColor(12, 35, 64);
      pdf.text("M Y   I D E A", w / 2, 24, { align: "center" });

      pdf.setDrawColor(184, 134, 11);
      pdf.setLineWidth(0.3);
      pdf.line(w / 2 - 26, 30, w / 2 - 6, 30);
      pdf.line(w / 2 + 6, 30, w / 2 + 26, 30);

      pdf.setTextColor(4, 44, 83);
      pdf.setFontSize(28);
      pdf.setFont("times", "bold");
      pdf.text("Certificate of Completion", w / 2, 46, { align: "center" });

      pdf.setFontSize(12);
      pdf.setFont("times", "italic");
      pdf.setTextColor(107, 100, 86);
      pdf.text("This is proudly presented to", w / 2, 58, { align: "center" });

      pdf.setTextColor(12, 68, 124);
      pdf.setFontSize(34);
      pdf.setFont("times", "bold");
      pdf.text(recipientName, w / 2, 76, { align: "center" });

      pdf.setDrawColor(184, 134, 11);
      pdf.setLineWidth(0.5);
      pdf.line(w / 2 - 22, 80, w / 2 + 22, 80);

      pdf.setTextColor(107, 100, 86);
      pdf.setFontSize(12);
      pdf.setFont("times", "italic");
      pdf.text("for successfully completing the course", w / 2, 92, {
        align: "center",
      });

      pdf.setTextColor(4, 44, 83);
      pdf.setFontSize(20);
      pdf.setFont("times", "bold");
      pdf.text(topicTitle, w / 2, 104, { align: "center" });

      if (learningSummary) {
        pdf.setFont("times", "italic");
        pdf.setFontSize(9);
        pdf.setTextColor(107, 100, 86);
        pdf.text("What you learned", w / 2, 113, { align: "center" });

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(12, 35, 64);
        const lines = pdf.splitTextToSize(learningSummary, w - 110);
        pdf.text(lines, w / 2, 119, { align: "center" });
      }

      pdf.setDrawColor(12, 35, 64);
      pdf.setLineWidth(0.2);
      pdf.addImage(DIRECTOR_SIGNATURE_DATA_URL, "PNG", 37.5, h - 75, 45, 13.16);
      pdf.line(30, h - 60, 90, h - 60);
      pdf.line(w - 90, h - 60, w - 30, h - 60);
      pdf.setFont("times", "normal");
      pdf.setFontSize(11);
      pdf.setTextColor(4, 44, 83);
      pdf.text("Ali Abd alnasser", 60, h - 53, { align: "center" });
      pdf.text(dateStr, w - 60, h - 53, { align: "center" });
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(107, 100, 86);
      pdf.setFontSize(8);
      pdf.text("DIRECTOR, MY IDEA ACADEMY", 60, h - 48, { align: "center" });
      pdf.text("ISSUE DATE", w - 60, h - 48, { align: "center" });

      pdf.setDrawColor(184, 134, 11);
      pdf.setLineWidth(1.1);
      pdf.circle(w / 2, h - 53, 13, "S");
      pdf.setDrawColor(12, 35, 64);
      pdf.setLineWidth(0.4);
      pdf.circle(w / 2, h - 53, 11, "S");
      if (qrDataUrl) {
        pdf.addImage(qrDataUrl, "PNG", w / 2 - 9, h - 62, 18, 18);
      }
      pdf.setFontSize(7);
      pdf.setTextColor(107, 100, 86);
      pdf.text(certId ?? "", w / 2, h - 37, { align: "center" });

      pdf.save(`My-Idea-${topicTitle.replace(/\s+/g, "-")}-Certificate.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-title"
        tabIndex={-1}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("certificate.closeLabel")}
          className="absolute end-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-background/70 text-foreground/80 backdrop-blur transition hover:bg-muted"
        >
          <X className="size-4" />
        </button>

        <div
          ref={cardRef}
          className="relative aspect-[1.414/1] w-full overflow-hidden p-8 text-center"
          style={{ background: IVORY, color: NAVY }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 141.4 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="cert-curve-lines"
                width="9"
                height="9"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M -1,10 Q 4.5,4.5 10,-1"
                  stroke="#111111"
                  strokeWidth="0.5"
                  strokeOpacity="0.09"
                  fill="none"
                />
              </pattern>
              <clipPath id="cert-inner-clip">
                <rect x="4" y="4" width="133.4" height="92" />
              </clipPath>
            </defs>
            <rect
              x="4"
              y="4"
              width="133.4"
              height="92"
              fill="url(#cert-curve-lines)"
              clipPath="url(#cert-inner-clip)"
            />
          </svg>

          <div
            className="absolute inset-3 border-2"
            style={{ borderColor: GOLD }}
          />
          <div
            className="absolute inset-[18px] border"
            style={{ borderColor: NAVY }}
          />

          {(["tl", "tr", "bl", "br"] as const).map((corner) => (
            <div
              key={corner}
              className="pointer-events-none absolute size-[26px]"
              style={cornerPos(corner)}
            >
              <div
                className="absolute inset-0"
                style={cornerBorder(corner, GOLD, 2.5)}
              />
              <div
                className="absolute"
                style={cornerInnerBorder(corner, NAVY)}
              />
            </div>
          ))}

          <Logo className="absolute left-[34px] top-[34px] size-[34px]" />

          <div className="relative flex h-full flex-col items-center justify-between px-1.5 py-[34px] pb-2">
            <div className="w-full">
              <p
                className="m-0 mb-3.5 text-[17px] font-medium uppercase tracking-[0.3em]"
                style={{ fontFamily: "var(--font-voice)", color: NAVY }}
              >
                My Idea Academy
              </p>

              <div className="mb-3 flex items-center justify-center gap-2.5">
                <div
                  className="h-px w-[60px]"
                  style={{ backgroundColor: GOLD }}
                />
                <div
                  className="size-1.5 rotate-45"
                  style={{ backgroundColor: GOLD }}
                />
                <div
                  className="h-px w-[60px]"
                  style={{ backgroundColor: GOLD }}
                />
              </div>

              <h2
                id="certificate-modal-title"
                className="text-[25px] font-medium tracking-[0.03em]"
                style={{ fontFamily: "var(--font-voice)", color: NAVY }}
              >
                Certificate of Completion
              </h2>
              <p
                className="mt-2 text-[12.5px] italic"
                style={{ fontFamily: "var(--font-voice)", color: MUTED }}
              >
                This is proudly presented to
              </p>

              <p
                className="mt-2 text-[30px] font-medium"
                style={{ fontFamily: "var(--font-voice)", color: NAVY }}
              >
                {recipientName}
              </p>
              <div
                className="mx-auto mt-1.5 h-[1.5px] w-[110px]"
                style={{ backgroundColor: GOLD }}
              />

              <p
                className="mt-2 text-[11.5px] italic"
                style={{ fontFamily: "var(--font-voice)", color: MUTED }}
              >
                for successfully completing the course
              </p>
              <p
                className="mt-1 text-[17px] font-medium"
                style={{ fontFamily: "var(--font-voice)", color: NAVY }}
              >
                {topicTitle}
              </p>

              {learningSummary ? (
                <div className="mt-2.5 px-10">
                  <p
                    className="text-[9.5px] italic"
                    style={{ fontFamily: "var(--font-voice)", color: MUTED }}
                  >
                    What you learned
                  </p>
                  <p
                    className="mt-1 text-[9px] leading-snug"
                    style={{ color: NAVY }}
                  >
                    {learningSummary}
                  </p>
                </div>
              ) : null}
            </div>

            <div
              className="flex w-full items-end justify-between text-[10px] uppercase tracking-[0.08em]"
              style={{ color: MUTED }}
            >
              <div className="flex-1 text-center">
                <img
                  src={DIRECTOR_SIGNATURE_DATA_URL}
                  alt=""
                  className="mx-auto h-5 w-auto object-contain"
                />
                <div
                  className="mx-auto mb-1.5 h-px w-[90px]"
                  style={{ backgroundColor: NAVY, opacity: 0.4 }}
                />
                <p
                  className="text-[13px] normal-case tracking-normal"
                  style={{ fontFamily: "var(--font-voice)", color: NAVY }}
                >
                  Ali Abd alnasser
                </p>
                <p className="mt-0.5">Director, My Idea Academy</p>
              </div>

              <div className="mx-2.5 flex flex-col items-center">
                <div
                  className="flex size-[58px] items-center justify-center rounded-full border-[2.5px] p-1"
                  style={{ borderColor: GOLD, backgroundColor: IVORY }}
                >
                  <div
                    className="flex size-full items-center justify-center overflow-hidden rounded-full border bg-white"
                    style={{ borderColor: NAVY }}
                  >
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt="Verification QR"
                        className="size-[78%] object-contain"
                      />
                    ) : null}
                  </div>
                </div>
                <p className="mt-1.5 font-mono text-[9px] normal-case tracking-normal">
                  {certId ?? t("certificate.pending")}
                </p>
              </div>

              <div className="flex-1 text-center">
                <div
                  className="mx-auto mb-1.5 h-px w-[90px]"
                  style={{ backgroundColor: NAVY, opacity: 0.4 }}
                />
                <p
                  className="text-[13px] normal-case tracking-normal"
                  style={{ fontFamily: "var(--font-voice)", color: NAVY }}
                >
                  {dateStr}
                </p>
                <p className="mt-0.5">Issue date</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border bg-card/90 px-5 py-4">
          <p className="text-xs text-muted-foreground">
            {t("certificate.certIdLabel")}{" "}
            <span className="font-mono">
              {certId ?? t("certificate.pending")}
            </span>
          </p>
          <button
            type="button"
            onClick={downloadPdf}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-4 py-2 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95 disabled:opacity-50"
          >
            {downloading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            {t("certificate.downloadButton")}
          </button>
        </div>
      </div>
    </div>
  );
}

function cornerPos(corner: "tl" | "tr" | "bl" | "br"): CSSProperties {
  const base: CSSProperties = {
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
  };
  if (corner === "tl") return { ...base, top: 16, left: 16 };
  if (corner === "tr") return { ...base, top: 16, right: 16 };
  if (corner === "bl") return { ...base, bottom: 16, left: 16 };
  return { ...base, bottom: 16, right: 16 };
}
function cornerBorder(
  corner: "tl" | "tr" | "bl" | "br",
  color: string,
  width: number,
): CSSProperties {
  const w = `${width}px solid ${color}`;
  if (corner === "tl") return { borderTop: w, borderLeft: w };
  if (corner === "tr") return { borderTop: w, borderRight: w };
  if (corner === "bl") return { borderBottom: w, borderLeft: w };
  return { borderBottom: w, borderRight: w };
}
function cornerInnerBorder(
  corner: "tl" | "tr" | "bl" | "br",
  color: string,
): CSSProperties {
  const w = `1px solid ${color}`;
  const size = "18px";
  if (corner === "tl")
    return {
      top: 6,
      left: 6,
      width: size,
      height: size,
      borderTop: w,
      borderLeft: w,
    };
  if (corner === "tr")
    return {
      top: 6,
      right: 6,
      width: size,
      height: size,
      borderTop: w,
      borderRight: w,
    };
  if (corner === "bl")
    return {
      bottom: 6,
      left: 6,
      width: size,
      height: size,
      borderBottom: w,
      borderLeft: w,
    };
  return {
    bottom: 6,
    right: 6,
    width: size,
    height: size,
    borderBottom: w,
    borderRight: w,
  };
}
