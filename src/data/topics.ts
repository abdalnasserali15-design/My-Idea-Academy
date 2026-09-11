import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  BrainCircuit,
  Code2,
  Network,
  Skull,
  Database,
  Cloud,
  Cpu,
  Briefcase,
} from "lucide-react";

export interface Topic {
  slug: string;
  i18nKey: string;
  icon: LucideIcon;
  accent: "neon" | "violet";
}

export const TOPICS: Topic[] = [
  {
    slug: "cybersecurity",
    i18nKey: "cybersecurity",
    icon: ShieldCheck,
    accent: "neon",
  },
  { slug: "ai", i18nKey: "ai", icon: BrainCircuit, accent: "violet" },
  {
    slug: "software-engineering",
    i18nKey: "software",
    icon: Code2,
    accent: "neon",
  },
  {
    slug: "networking",
    i18nKey: "networking",
    icon: Network,
    accent: "violet",
  },
  { slug: "ethical-hacking", i18nKey: "hacking", icon: Skull, accent: "neon" },
  { slug: "data-science", i18nKey: "data", icon: Database, accent: "violet" },
  { slug: "cloud-computing", i18nKey: "cloud", icon: Cloud, accent: "neon" },
  { slug: "operating-systems", i18nKey: "os", icon: Cpu, accent: "violet" },
  {
    slug: "professional-skills",
    i18nKey: "skills",
    icon: Briefcase,
    accent: "neon",
  },
];
