import type { LucideIcon } from "lucide-react";
import {
  Flashlight,
  QrCode,
  Image,
  MessageCircle,
  Activity,
  Gamepad2,
  CloudSun,
  Video,
  Landmark,
  Car,
  Moon,
  Newspaper,
} from "lucide-react";

export const PERMISSION_KEYS = [
  "camera",
  "microphone",
  "contacts",
  "location",
  "sms",
  "callLog",
  "storage",
  "motionFitness",
] as const;
export type PermissionKey = (typeof PERMISSION_KEYS)[number];

export interface AppPermission {
  key: PermissionKey;
  justified: boolean;
  reasonKey?: string;
}

export interface AppScenario {
  slug: string;
  i18nKey: string;
  icon: LucideIcon;
  permissions: AppPermission[];
}

export const APP_SCENARIOS: AppScenario[] = [
  {
    slug: "flashlight",
    i18nKey: "flashlight",
    icon: Flashlight,
    permissions: [
      { key: "camera", justified: true },
      { key: "contacts", justified: false, reasonKey: "flashlightContacts" },
      { key: "location", justified: false, reasonKey: "flashlightLocation" },
      { key: "sms", justified: false, reasonKey: "flashlightSms" },
      {
        key: "microphone",
        justified: false,
        reasonKey: "flashlightMicrophone",
      },
    ],
  },
  {
    slug: "qr-scanner",
    i18nKey: "qrScanner",
    icon: QrCode,
    permissions: [
      { key: "camera", justified: true },
      { key: "storage", justified: true },
      { key: "contacts", justified: false, reasonKey: "qrContacts" },
      { key: "callLog", justified: false, reasonKey: "qrCallLog" },
      { key: "location", justified: false, reasonKey: "qrLocation" },
    ],
  },
  {
    slug: "photo-editor",
    i18nKey: "photoEditor",
    icon: Image,
    permissions: [
      { key: "storage", justified: true },
      { key: "camera", justified: true },
      { key: "location", justified: false, reasonKey: "photoLocation" },
      { key: "contacts", justified: false, reasonKey: "photoContacts" },
      { key: "microphone", justified: false, reasonKey: "photoMicrophone" },
    ],
  },
  {
    slug: "messaging",
    i18nKey: "messaging",
    icon: MessageCircle,
    permissions: [
      { key: "contacts", justified: true },
      { key: "camera", justified: true },
      { key: "microphone", justified: true },
      { key: "storage", justified: true },
      { key: "callLog", justified: false, reasonKey: "messagingCallLog" },
      { key: "location", justified: false, reasonKey: "messagingLocation" },
    ],
  },
  {
    slug: "fitness-tracker",
    i18nKey: "fitnessTracker",
    icon: Activity,
    permissions: [
      { key: "location", justified: true },
      { key: "motionFitness", justified: true },
      { key: "contacts", justified: false, reasonKey: "fitnessContacts" },
      { key: "camera", justified: false, reasonKey: "fitnessCamera" },
      { key: "sms", justified: false, reasonKey: "fitnessSms" },
    ],
  },
  {
    slug: "puzzle-game",
    i18nKey: "puzzleGame",
    icon: Gamepad2,
    permissions: [
      { key: "contacts", justified: false, reasonKey: "gameContacts" },
      { key: "location", justified: false, reasonKey: "gameLocation" },
      { key: "microphone", justified: false, reasonKey: "gameMicrophone" },
      { key: "camera", justified: false, reasonKey: "gameCamera" },
      { key: "sms", justified: false, reasonKey: "gameSms" },
    ],
  },
  {
    slug: "weather",
    i18nKey: "weather",
    icon: CloudSun,
    permissions: [
      { key: "location", justified: true },
      { key: "contacts", justified: false, reasonKey: "weatherContacts" },
      { key: "camera", justified: false, reasonKey: "weatherCamera" },
      { key: "microphone", justified: false, reasonKey: "weatherMicrophone" },
      { key: "sms", justified: false, reasonKey: "weatherSms" },
    ],
  },
  {
    slug: "video-calling",
    i18nKey: "videoCalling",
    icon: Video,
    permissions: [
      { key: "camera", justified: true },
      { key: "microphone", justified: true },
      { key: "contacts", justified: true },
      { key: "storage", justified: true },
      { key: "sms", justified: false, reasonKey: "videoSms" },
    ],
  },
  {
    slug: "banking",
    i18nKey: "banking",
    icon: Landmark,
    permissions: [
      { key: "camera", justified: true },
      { key: "storage", justified: true },
      { key: "contacts", justified: false, reasonKey: "bankingContacts" },
      {
        key: "microphone",
        justified: false,
        reasonKey: "bankingMicrophone",
      },
      { key: "callLog", justified: false, reasonKey: "bankingCallLog" },
    ],
  },
  {
    slug: "ride-hailing",
    i18nKey: "rideHailing",
    icon: Car,
    permissions: [
      { key: "location", justified: true },
      { key: "contacts", justified: true },
      {
        key: "microphone",
        justified: false,
        reasonKey: "rideHailingMicrophone",
      },
      { key: "camera", justified: false, reasonKey: "rideHailingCamera" },
      { key: "sms", justified: false, reasonKey: "rideHailingSms" },
    ],
  },
  {
    slug: "sleep-tracker",
    i18nKey: "sleepTracker",
    icon: Moon,
    permissions: [
      { key: "motionFitness", justified: true },
      { key: "storage", justified: true },
      { key: "contacts", justified: false, reasonKey: "sleepContacts" },
      { key: "camera", justified: false, reasonKey: "sleepCamera" },
      { key: "sms", justified: false, reasonKey: "sleepSms" },
      { key: "callLog", justified: false, reasonKey: "sleepCallLog" },
    ],
  },
  {
    slug: "news-reader",
    i18nKey: "newsReader",
    icon: Newspaper,
    permissions: [
      { key: "storage", justified: true },
      { key: "location", justified: false, reasonKey: "newsLocation" },
      { key: "contacts", justified: false, reasonKey: "newsContacts" },
      { key: "camera", justified: false, reasonKey: "newsCamera" },
      { key: "microphone", justified: false, reasonKey: "newsMicrophone" },
      { key: "sms", justified: false, reasonKey: "newsSms" },
    ],
  },
];

export const TIP_KEYS = [
  "doesItMakeSense",
  "utilityApps",
  "smsRisk",
  "changeAnytime",
  "whenInDoubt",
] as const;
