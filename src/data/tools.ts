import type { LucideIcon } from "lucide-react";
import {
  KeyRound,
  MailWarning,
  Mail,
  Hash,
  Lock,
  Link,
  ShieldAlert,
  Radar,
  ShieldCheck,
  Binary,
} from "lucide-react";

export interface ToolDef {
  slug: string;
  i18nKey: string;
  icon: LucideIcon;
  accent: "neon" | "violet";
  category: "cyber" | "networking" | "topics";
}

export const TOOLS: ToolDef[] = [
  {
    slug: "password-strength",
    i18nKey: "passwordStrength",
    icon: KeyRound,
    accent: "neon",
    category: "cyber",
  },
  {
    slug: "phishing-awareness",
    i18nKey: "phishingTrainer",
    icon: MailWarning,
    accent: "violet",
    category: "cyber",
  },
  {
    slug: "email-checker",
    i18nKey: "emailChecker",
    icon: Mail,
    accent: "neon",
    category: "cyber",
  },
  {
    slug: "hash-toolkit",
    i18nKey: "hashTool",
    icon: Hash,
    accent: "neon",
    category: "cyber",
  },
  {
    slug: "encryption-toolkit",
    i18nKey: "encryptionTool",
    icon: Lock,
    accent: "violet",
    category: "cyber",
  },
  {
    slug: "link-checker",
    i18nKey: "linkChecker",
    icon: Link,
    accent: "neon",
    category: "cyber",
  },
  {
    slug: "network-defense",
    i18nKey: "networkDefense",
    icon: ShieldAlert,
    accent: "violet",
    category: "cyber",
  },
  {
    slug: "attack-defense-planner",
    i18nKey: "attackPlanner",
    icon: Radar,
    accent: "neon",
    category: "cyber",
  },
  {
    slug: "app-permissions",
    i18nKey: "appPermissions",
    icon: ShieldCheck,
    accent: "violet",
    category: "cyber",
  },
  {
    slug: "bit-ascii",
    i18nKey: "bitAscii",
    icon: Binary,
    accent: "neon",
    category: "networking",
  },
];
