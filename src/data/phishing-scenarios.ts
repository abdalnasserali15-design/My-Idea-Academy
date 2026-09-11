export type PhishingItemType = "sender" | "subject" | "sentence" | "link";

export interface PhishingFlag {
  label: string;
  explanation: string;
}

export interface PhishingItem {
  type: PhishingItemType;
  text?: string;
  name?: string;
  address?: string;
  flag?: PhishingFlag;
}

export type PhishingDifficulty = "easy" | "medium" | "hard";

export interface PhishingScenario {
  channel: "mail" | "message";
  difficulty: PhishingDifficulty;
  isPhishing: boolean;
  attackType?: string;
  psychPrinciple?: string;
  safeExplanation?: string;
  items: PhishingItem[];
}

export const PHISHING_SCENARIOS: PhishingScenario[] = [
  {
    channel: "mail",
    difficulty: "easy",
    isPhishing: true,
    attackType: "Advance-fee scam",
    psychPrinciple: "Greed, a reward that feels too good to pass up",
    items: [
      {
        type: "sender",
        name: "International Prize Committee",
        address: "winner@luckydraw-rewards.info",
        flag: {
          label: "Unrelated domain",
          explanation:
            "No connection to any real organization that would run a prize draw.",
        },
      },
      { type: "subject", text: "Congratulations, you've won $1,000" },
      { type: "sentence", text: "Dear Winner," },
      {
        type: "sentence",
        text: "You have been randomly selected out of millions of email addresses to receive a cash reward of $1,000.",
        flag: {
          label: "Unearned prize",
          explanation: "You can't win a contest you never entered.",
        },
      },
      {
        type: "sentence",
        text: "To claim your prize, simply reply to this email with your full name, home address, and bank account details within 48 hours.",
        flag: {
          label: "Requests personal and bank details",
          explanation:
            "No legitimate prize needs your bank details sent by email, especially under a tight deadline.",
        },
      },
      { type: "sentence", text: "Congratulations once again!" },
    ],
  },
  {
    channel: "mail",
    difficulty: "easy",
    isPhishing: false,
    safeExplanation:
      "Addressed to you by name, matches the company's real domain, no urgency, and no request to click a link to verify anything.",
    items: [
      {
        type: "sender",
        name: "ShopWave Orders",
        address: "orders@shopwave.com",
      },
      { type: "subject", text: "Your order #48213 has shipped" },
      { type: "sentence", text: "Hi Alex," },
      {
        type: "sentence",
        text: "Good news, your recent order has shipped and is on its way.",
      },
      {
        type: "sentence",
        text: "Estimated delivery is between March 14 and March 17.",
      },
      {
        type: "sentence",
        text: "You can track your package anytime from the orders section of your account.",
      },
      { type: "sentence", text: "Thanks for shopping with us." },
    ],
  },
  {
    channel: "message",
    difficulty: "easy",
    isPhishing: true,
    attackType: "Smishing (SMS phishing)",
    psychPrinciple: "Urgency, fear of missing a delivery",
    items: [
      { type: "sender", name: "Unknown sender", address: "+1 (555) 019-2837" },
      { type: "sentence", text: "Your package could not be delivered today." },
      {
        type: "sentence",
        text: "Reschedule now or it will be returned to sender:",
        flag: {
          label: "Unexpected urgency",
          explanation:
            "An unprompted, urgent message about a delivery you may not even be expecting.",
        },
      },
      {
        type: "link",
        text: "bit.ly/redlvr-3xk",
        flag: {
          label: "Shortened link",
          explanation:
            "Shortened links hide the real destination, this one leads to a raw IP address, not a delivery company.",
        },
      },
    ],
  },
  {
    channel: "mail",
    difficulty: "easy",
    isPhishing: false,
    safeExplanation:
      "A normal, low-pressure message between colleagues. No links, no requests for credentials, no urgency.",
    items: [
      {
        type: "sender",
        name: "Priya Sharma",
        address: "priya.sharma@teamcloud.io",
      },
      { type: "subject", text: "Meeting notes from today" },
      { type: "sentence", text: "Hey!" },
      { type: "sentence", text: "Sharing the notes from our sync earlier." },
      {
        type: "sentence",
        text: "Let me know if I missed anything before Thursday's review.",
      },
    ],
  },
  {
    channel: "mail",
    difficulty: "medium",
    isPhishing: true,
    attackType: "Credential harvesting",
    psychPrinciple: "Fear, a threat of losing account access",
    items: [
      {
        type: "sender",
        name: "NovaBank Security",
        address: "security@novabank-alerts-verify.com",
        flag: {
          label: "Lookalike domain",
          explanation:
            "The address only resembles NovaBank's real domain, it isn't novabank.com.",
        },
      },
      {
        type: "subject",
        text: "Immediate action required: unusual sign-in detected",
      },
      { type: "sentence", text: "Dear Valued Customer," },
      {
        type: "sentence",
        text: "Our security system flagged a sign-in attempt to your account from an unrecognized device in Lagos, Nigeria.",
      },
      {
        type: "sentence",
        text: "For your protection, we have temporarily limited some features on your account.",
      },
      {
        type: "sentence",
        text: "To restore full access, please confirm your login details using the link below within the next 24 hours.",
        flag: {
          label: "Asks for login details through a link",
          explanation:
            "Legitimate banks never ask you to confirm a password by clicking a link in an email.",
        },
      },
      {
        type: "sentence",
        text: "If you do not verify in time, your account will be suspended and any pending transfers will be cancelled.",
        flag: {
          label: "Urgent threat",
          explanation:
            "A tight deadline and the threat of losing access are designed to make you act before thinking it through.",
        },
      },
      { type: "sentence", text: "Thank you for banking with NovaBank." },
      { type: "sentence", text: "NovaBank Security Team" },
      {
        type: "link",
        text: "Confirm my identity",
        flag: {
          label: "Mismatched destination",
          explanation: "The button doesn't lead to NovaBank's real website.",
        },
      },
    ],
  },
  {
    channel: "mail",
    difficulty: "medium",
    isPhishing: false,
    safeExplanation:
      "A real security notice from the correct domain. It informs you but doesn't pressure you to click an embedded link or hand over a password.",
    items: [
      { type: "sender", name: "DevHub", address: "noreply@devhub.com" },
      { type: "subject", text: "New sign-in to your account" },
      { type: "sentence", text: "Hi there," },
      {
        type: "sentence",
        text: "We noticed a new sign-in to your account from a Chrome browser on Windows, located near Cairo, Egypt.",
      },
      {
        type: "sentence",
        text: "If this was you, there's nothing else you need to do.",
      },
      {
        type: "sentence",
        text: "If you don't recognize this activity, we recommend securing your account from your account settings.",
      },
    ],
  },
  {
    channel: "mail",
    difficulty: "medium",
    isPhishing: true,
    attackType: "Business email compromise (internal impersonation)",
    psychPrinciple: "Authority, impersonating a trusted internal department",
    items: [
      {
        type: "sender",
        name: "IT Helpdesk",
        address: "it-support@corp-helpdesk-portal.net",
        flag: {
          label: "Domain doesn't match the company",
          explanation:
            "Real internal IT emails come from your company's actual domain, not a lookalike one.",
        },
      },
      { type: "subject", text: "Your password expires today, action required" },
      { type: "sentence", text: "Hello," },
      {
        type: "sentence",
        text: "This is an automated notice from the IT department.",
      },
      {
        type: "sentence",
        text: "Our records show that your network password will expire at the end of today.",
      },
      {
        type: "sentence",
        text: "To avoid losing access to your email and internal systems, please update your password immediately using the secure link below.",
        flag: {
          label: "Urgency plus a password request",
          explanation:
            '"Immediately" plus a link asking you to update your password is a classic pressure tactic.',
        },
      },
      {
        type: "sentence",
        text: "If you have already changed your password recently, you can disregard this message.",
      },
      { type: "sentence", text: "IT Support" },
      {
        type: "link",
        text: "Update password now",
        flag: {
          label: "Mismatched link",
          explanation:
            "The link points to the lookalike domain, not your company's real IT system.",
        },
      },
    ],
  },
  {
    channel: "mail",
    difficulty: "hard",
    isPhishing: true,
    attackType: "Brand impersonation",
    psychPrinciple:
      "Authority and urgency combined, a trusted brand plus a ticking clock",
    items: [
      {
        type: "sender",
        name: "PayFlow Security",
        address: "PayFlow-Security-Team@mailservice293.ru",
        flag: {
          label: "Display name doesn't match the address",
          explanation:
            'It says "PayFlow Security", but the actual address is an unrelated domain. Always check the real address, not just the name.',
        },
      },
      { type: "subject", text: "Unusual login attempt detected" },
      { type: "sentence", text: "Dear Customer," },
      {
        type: "sentence",
        text: "We detected a login attempt to your PayFlow account from a new device in Hanoi, Vietnam.",
      },
      {
        type: "sentence",
        text: "If this wasn't you, your account may be at risk.",
      },
      {
        type: "sentence",
        text: "Please confirm your identity now to secure your account before it is temporarily locked.",
        flag: {
          label: "Urgency plus identity confirmation",
          explanation:
            '"Now" and "before it is locked" push you to click without checking where the link really goes.',
        },
      },
      {
        type: "link",
        text: "Secure my account",
        flag: {
          label: "Mismatched link",
          explanation: "The real destination has nothing to do with PayFlow.",
        },
      },
    ],
  },
];

export const PHISHING_RED_FLAGS: string[] = [
  'Urgency and threats ("act now or lose access") pressure you to skip careful thinking.',
  'Generic greetings like "dear customer" instead of your actual name are a common tell.',
  "The sender's display name can say anything, always check the real address behind it.",
  "Tap or hover over links before trusting them, the real destination is often a lookalike domain.",
  "Legitimate companies rarely ask you to confirm a password through a link.",
  "Offers that sound too good to be true, prizes, free money, usually are.",
];
