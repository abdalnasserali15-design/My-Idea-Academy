const AMBIGUOUS_CHARS = "l1IO0o";

const CHAR_POOLS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbol: "!@#$%^&*()-_=+[]{}",
};

const WORDLIST = [
  "river",
  "cloud",
  "stone",
  "garden",
  "bridge",
  "forest",
  "canyon",
  "desert",
  "glacier",
  "island",
  "jungle",
  "meadow",
  "marble",
  "orchard",
  "pebble",
  "summit",
  "thunder",
  "valley",
  "willow",
  "horizon",
  "tundra",
  "dune",
  "fjord",
  "grove",
  "hollow",
  "ridge",
  "spruce",
  "moss",
  "oak",
  "prairie",
  "reef",
  "stream",
  "trail",
  "vista",
  "wave",
  "alpine",
  "birch",
  "cascade",
  "dawn",
  "fern",
  "glade",
  "isle",
  "knoll",
  "ledge",
  "marsh",
  "oasis",
  "pond",
  "ripple",
  "shore",
  "thicket",
  "upland",
  "vale",
  "wetland",
  "cliff",
  "dusk",
  "evergreen",
  "field",
  "grain",
  "hazel",
  "inlet",
  "kiln",
  "lake",
  "moor",
  "nest",
  "olive",
  "peak",
  "quay",
  "reed",
  "slope",
  "tide",
  "vine",
  "autumn",
  "boulder",
  "current",
  "drift",
  "frost",
  "glimmer",
  "haven",
  "ivy",
  "jade",
  "lark",
  "nova",
  "quest",
  "urban",
  "wren",
  "yarrow",
  "zinnia",
  "north",
  "tiger",
  "falcon",
  "raven",
  "kestrel",
  "heron",
  "otter",
  "badger",
  "rabbit",
  "beaver",
  "dolphin",
  "panther",
  "eagle",
  "salmon",
  "candle",
  "lantern",
  "kettle",
  "ribbon",
  "quill",
  "anchor",
  "copper",
  "amber",
  "opal",
  "onyx",
  "jasper",
  "quartz",
  "granite",
  "ivory",
  "coral",
  "velvet",
  "indigo",
  "violet",
  "saffron",
  "umber",
  "zest",
  "zenith",
  "nectar",
  "pepper",
  "basil",
  "cedar",
  "dahlia",
  "lilac",
  "maple",
  "walnut",
  "juniper",
  "pine",
  "timber",
  "harbor",
  "meadowlark",
  "canvas",
  "compass",
  "lighthouse",
  "voyage",
  "cabin",
  "ember",
  "chalk",
  "clover",
  "cotton",
  "linen",
  "paper",
  "brass",
  "bronze",
  "silver",
  "crystal",
  "garnet",
  "topaz",
  "emerald",
  "sapphire",
  "citrine",
  "obsidian",
  "pumpkin",
  "cherry",
  "lemon",
  "mango",
  "papaya",
  "coconut",
  "almond",
  "hazelnut",
  "chestnut",
  "barley",
  "wheat",
  "daisy",
  "tulip",
  "poppy",
  "orchid",
  "jasmine",
  "lavender",
  "rosemary",
  "thyme",
  "mint",
  "ginger",
  "cinnamon",
  "vanilla",
  "honey",
];

function secureRandomInt(max: number): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

export interface CharGeneratorOptions {
  length: number;
  upper: boolean;
  lower: boolean;
  number: boolean;
  symbol: boolean;
  avoidAmbiguous: boolean;
}

export function generateCharPassword(
  opts: CharGeneratorOptions,
): string | null {
  const strip = (s: string) =>
    opts.avoidAmbiguous
      ? [...s].filter((c) => !AMBIGUOUS_CHARS.includes(c)).join("")
      : s;

  const pools: string[] = [];
  if (opts.upper) pools.push(strip(CHAR_POOLS.upper));
  if (opts.lower) pools.push(strip(CHAR_POOLS.lower));
  if (opts.number) pools.push(strip(CHAR_POOLS.number));
  if (opts.symbol) pools.push(strip(CHAR_POOLS.symbol));
  if (pools.length === 0) return null;

  const all = pools.join("");
  const targetLength = Math.max(opts.length, pools.length);
  const result: string[] = [];
  pools.forEach((pool) => {
    if (pool.length > 0) result.push(pool[secureRandomInt(pool.length)]);
  });
  while (result.length < targetLength) {
    result.push(all[secureRandomInt(all.length)]);
  }
  for (let i = result.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, targetLength).join("");
}

export interface PassphraseOptions {
  wordCount: number;
  separators: string[];
  capitalize: boolean;
  addNumber: boolean;
}

export function generatePassphrase(opts: PassphraseOptions): string | null {
  if (opts.separators.length === 0) return null;

  const words: string[] = [];
  for (let i = 0; i < opts.wordCount; i++) {
    let w = WORDLIST[secureRandomInt(WORDLIST.length)];
    if (opts.capitalize) w = w.charAt(0).toUpperCase() + w.slice(1);
    words.push(w);
  }
  if (opts.addNumber) {
    words.push(String(secureRandomInt(90) + 10));
  }
  if (words.length === 0) return null;

  let result = words[0];
  for (let i = 1; i < words.length; i++) {
    const sep = opts.separators[secureRandomInt(opts.separators.length)];
    result += sep + words[i];
  }
  return result;
}
