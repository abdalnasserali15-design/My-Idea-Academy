import type { LucideIcon } from "lucide-react";
import {
  Mail,
  Lock,
  Wifi,
  UserX,
  KeyRound,
  Database,
  Truck,
  Users,
} from "lucide-react";

export interface AttackScenario {
  slug: string;
  i18nKey: string;
  icon: LucideIcon;
}

export const ATTACK_SCENARIOS: AttackScenario[] = [
  { slug: "phishing", i18nKey: "phishing", icon: Mail },
  { slug: "ransomware", i18nKey: "ransomware", icon: Lock },
  { slug: "ddos", i18nKey: "ddos", icon: Wifi },
  { slug: "insider-threat", i18nKey: "insiderThreat", icon: UserX },
  {
    slug: "credential-stuffing",
    i18nKey: "credentialStuffing",
    icon: KeyRound,
  },
  { slug: "sql-injection", i18nKey: "sqlInjection", icon: Database },
  { slug: "supply-chain", i18nKey: "supplyChain", icon: Truck },
  { slug: "social-engineering", i18nKey: "socialEngineering", icon: Users },
];
