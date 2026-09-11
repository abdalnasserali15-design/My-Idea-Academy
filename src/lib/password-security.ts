const COMMON_PASSWORDS = new Set([
  "123456",
  "password",
  "123456789",
  "12345678",
  "12345",
  "1234567",
  "1234567890",
  "qwerty",
  "abc123",
  "111111",
  "123123",
  "admin",
  "letmein",
  "welcome",
  "monkey",
  "football",
  "iloveyou",
  "000000",
  "password1",
  "qwerty123",
  "1q2w3e4r",
  "dragon",
  "master",
  "666666",
  "123321",
  "654321",
  "superman",
  "1qaz2wsx",
  "qazwsx",
  "zaq12wsx",
  "passw0rd",
  "trustno1",
  "sunshine",
  "princess",
  "login",
  "starwars",
]);

const LATIN_SEQUENCES = [
  "0123456789",
  "abcdefghijklmnopqrstuvwxyz",
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
];
const EN_TOP = "qwertyuiop";
const EN_HOME = "asdfghjkl";
const EN_BOTTOM = "zxcvbnm";
const ARABIC_ROWS = ["ضصثقفغعهخحجد", "شسيبلاتنمكط", "ئءؤرىةوزظ"];
const TURKISH_ROWS = ["qwertyuıopğü", "asdfghjklşi", "zxcvbnmöç"];
const GERMAN_ROWS = ["qwertzuiopü", "asdfghjklöä", "yxcvbnm"];

const NAMES = [
  "james",
  "john",
  "robert",
  "michael",
  "william",
  "david",
  "richard",
  "joseph",
  "thomas",
  "charles",
  "christopher",
  "daniel",
  "matthew",
  "anthony",
  "mark",
  "paul",
  "steven",
  "andrew",
  "kenneth",
  "kevin",
  "george",
  "edward",
  "brian",
  "ryan",
  "jacob",
  "justin",
  "scott",
  "brandon",
  "benjamin",
  "samuel",
  "mary",
  "patricia",
  "jennifer",
  "linda",
  "elizabeth",
  "barbara",
  "susan",
  "jessica",
  "sarah",
  "karen",
  "nancy",
  "lisa",
  "betty",
  "margaret",
  "sandra",
  "ashley",
  "kimberly",
  "emily",
  "donna",
  "michelle",
  "amanda",
  "melissa",
  "stephanie",
  "rebecca",
  "laura",
  "amy",
  "angela",
  "emma",
  "olivia",
  "noah",
  "liam",
  "mason",
  "ethan",
  "lucas",
  "sophia",
  "frank",
  "harold",
  "walter",
  "arthur",
  "raymond",
  "larry",
  "jerry",
  "dennis",
  "jeffrey",
  "roger",
  "gerald",
  "keith",
  "roy",
  "ralph",
  "eugene",
  "wayne",
  "howard",
  "carl",
  "harry",
  "willie",
  "dorothy",
  "helen",
  "ruth",
  "carol",
  "frances",
  "christine",
  "marie",
  "janet",
  "joan",
  "judith",
  "rose",
  "alice",
  "ann",
  "gloria",
  "teresa",
  "diane",
  "julie",
  "joyce",
  "christina",
  "denise",
  "sara",
  "rachel",
  "katherine",
  "marilyn",
  "beverly",
  "diana",
  "brenda",
  "judy",
  "kathleen",
  "cheryl",
  "debra",
  "danielle",
  "amber",
  "brittany",
  "carolyn",
  "janice",
  "julia",
  "heather",
  "virginia",
  "victoria",
  "kelly",
  "evelyn",
  "lauren",
  "megan",
  "hannah",
  "jacqueline",
  "martha",
  "jayden",
  "aiden",
  "caden",
  "wyatt",
  "grayson",
  "logan",
  "elijah",
  "sebastian",
  "jack",
  "owen",
  "luke",
  "carter",
  "julian",
  "levi",
  "isaac",
  "josiah",
  "nathan",
  "adrian",
  "christian",
  "jaxon",
  "dominic",
  "ian",
  "colton",
  "cameron",
  "hunter",
  "connor",
  "jordan",
  "austin",
  "jason",
  "tyler",
  "cody",
  "trevor",
  "dakota",
  "bradley",
  "jesse",
  "derek",
  "shane",
  "corey",
  "madison",
  "abigail",
  "isabella",
  "mia",
  "charlotte",
  "amelia",
  "harper",
  "ella",
  "scarlett",
  "grace",
  "riley",
  "aria",
  "lily",
  "aubrey",
  "zoey",
  "penelope",
  "nora",
  "jasmine",
  "destiny",
  "jamal",
  "malik",
  "darius",
  "deandre",
  "marquis",
  "terrell",
  "andre",
  "xavier",
  "isaiah",
  "emmanuel",
  "tyrone",
  "cedric",
  "jerome",
  "maurice",
  "reggie",
  "lamar",
  "kareem",
  "aaliyah",
  "imani",
  "nia",
  "ebony",
  "latoya",
  "tanisha",
  "keisha",
  "alicia",
  "monique",
  "chanel",
  "kiara",
  "diego",
  "alejandro",
  "eduardo",
  "manuel",
  "roberto",
  "sergio",
  "adriana",
  "daniela",
  "valeria",
  "ximena",
  "gabriela",
  "alejandra",
  "guadalupe",
  "carmen",
  "rosa",
  "isabel",
  "lucia",
  "marisol",
  "oliver",
  "henry",
  "leo",
  "freddie",
  "alfie",
  "oscar",
  "hugo",
  "felix",
  "rupert",
  "edmund",
  "cecil",
  "reginald",
  "percival",
  "nigel",
  "clive",
  "barry",
  "gareth",
  "colin",
  "alan",
  "martin",
  "graham",
  "russell",
  "neil",
  "leonard",
  "cyril",
  "bernard",
  "stanley",
  "norman",
  "alfred",
  "ernest",
  "herbert",
  "sidney",
  "rodney",
  "malcolm",
  "duncan",
  "fraser",
  "angus",
  "hamish",
  "callum",
  "lewis",
  "ewan",
  "ross",
  "stuart",
  "gordon",
  "douglas",
  "kenny",
  "lachlan",
  "rory",
  "euan",
  "alasdair",
  "dylan",
  "rhys",
  "gruffydd",
  "emrys",
  "idris",
  "aneurin",
  "gethin",
  "huw",
  "iestyn",
  "meirion",
  "sean",
  "declan",
  "cian",
  "oisin",
  "ronan",
  "cormac",
  "fionn",
  "tadhg",
  "aidan",
  "niall",
  "eoin",
  "patrick",
  "seamus",
  "brendan",
  "kieran",
  "conor",
  "poppy",
  "florence",
  "beatrice",
  "matilda",
  "eleanor",
  "cordelia",
  "arabella",
  "tabitha",
  "phoebe",
  "imogen",
  "tamsin",
  "rosalind",
  "primrose",
  "wilhelmina",
  "gwendolyn",
  "morwenna",
  "bronwen",
  "sian",
  "rhiannon",
  "fiona",
  "morag",
  "isla",
  "skye",
  "catriona",
  "moira",
  "siobhan",
  "aoife",
  "niamh",
  "roisin",
  "maeve",
  "orla",
  "bridget",
  "deirdre",
  "mohammed",
  "mohamed",
  "ahmed",
  "mahmoud",
  "ibrahim",
  "abdullah",
  "abdallah",
  "ali",
  "hassan",
  "hussein",
  "mostafa",
  "karim",
  "amr",
  "tarek",
  "sayed",
  "ashraf",
  "sherif",
  "wael",
  "osama",
  "sameh",
  "adel",
  "nabil",
  "gamal",
  "magdy",
  "reda",
  "fathy",
  "said",
  "salah",
  "emad",
  "hany",
  "walid",
  "ayman",
  "essam",
  "ramy",
  "alaa",
  "farouk",
  "fouad",
  "hamdy",
  "kamal",
  "mamdouh",
  "samir",
  "taha",
  "yehia",
  "zaki",
  "omar",
  "khaled",
  "youssef",
  "fatima",
  "aisha",
  "layla",
  "nour",
  "mariam",
  "yasmin",
  "salma",
  "dina",
  "heba",
  "rania",
  "dalia",
  "menna",
  "nada",
  "maria",
  "jose",
  "juan",
  "carlos",
  "luis",
  "miguel",
  "antonio",
  "francisco",
  "javier",
  "ana",
  "sofia",
  "camila",
  "joao",
  "pedro",
  "paulo",
  "ricardo",
  "fernando",
  "marcos",
  "rafael",
  "gabriel",
  "juliana",
  "fernanda",
  "beatriz",
  "mariana",
  "pierre",
  "jean",
  "michel",
  "philippe",
  "nicolas",
  "francois",
  "laurent",
  "julien",
  "antoine",
  "sophie",
  "isabelle",
  "nathalie",
  "catherine",
  "sylvie",
  "valerie",
  "celine",
  "amelie",
  "chloe",
  "manon",
  "lea",
  "giuseppe",
  "giovanni",
  "francesco",
  "marco",
  "alessandro",
  "andrea",
  "matteo",
  "lorenzo",
  "davide",
  "simone",
  "giulia",
  "francesca",
  "chiara",
  "valentina",
  "federica",
  "martina",
  "elena",
  "silvia",
  "jan",
  "willem",
  "hendrik",
  "pieter",
  "dirk",
  "gerrit",
  "johannes",
  "anna",
  "sanne",
  "lotte",
  "fleur",
  "saskia",
  "marieke",
  "mehmet",
  "mustafa",
  "huseyin",
  "ismail",
  "yusuf",
  "emre",
  "burak",
  "deniz",
  "elif",
  "zeynep",
  "esra",
  "merve",
  "ozge",
  "aylin",
  "ahmet",
  "mert",
  "kaan",
  "berk",
  "kerem",
  "ozan",
  "tolga",
  "serkan",
  "gokhan",
  "murat",
  "cem",
  "oguz",
  "tayfun",
  "volkan",
  "hakan",
  "ufuk",
  "baris",
  "caner",
  "eren",
  "arda",
  "kadir",
  "yasin",
  "furkan",
  "halil",
  "samet",
  "onur",
  "umut",
  "taner",
  "selim",
  "kagan",
  "alper",
  "bora",
  "cenk",
  "fatih",
  "orhan",
  "turgut",
  "ilker",
  "sinan",
  "guven",
  "metin",
  "nihat",
  "ozkan",
  "rustem",
  "sadik",
  "tarik",
  "yavuz",
  "ekrem",
  "sahin",
  "kemal",
  "riza",
  "yasar",
  "seda",
  "pinar",
  "gul",
  "gulsen",
  "nur",
  "ipek",
  "ceren",
  "damla",
  "ebru",
  "gizem",
  "hande",
  "irem",
  "nazli",
  "oya",
  "sema",
  "tugba",
  "yasemin",
  "busra",
  "derya",
  "feride",
  "gonca",
  "hulya",
  "kubra",
  "leyla",
  "meltem",
  "nese",
  "ozlem",
  "sevgi",
  "tulay",
  "hans",
  "klaus",
  "wolfgang",
  "dieter",
  "jurgen",
  "stefan",
  "andreas",
  "sabine",
  "petra",
  "ursula",
  "monika",
  "birgit",
  "heike",
  "peter",
  "werner",
  "helmut",
  "gunther",
  "manfred",
  "reinhard",
  "siegfried",
  "rudolf",
  "kurt",
  "otto",
  "hermann",
  "fritz",
  "gerhard",
  "horst",
  "ludwig",
  "friedrich",
  "wilhelm",
  "heinrich",
  "ferdinand",
  "matthias",
  "tobias",
  "lukas",
  "alexander",
  "maximilian",
  "moritz",
  "niklas",
  "jonas",
  "finn",
  "luca",
  "elias",
  "benedikt",
  "jakob",
  "simon",
  "florian",
  "johann",
  "konstantin",
  "valentin",
  "leon",
  "erik",
  "marcel",
  "sven",
  "jorg",
  "rainer",
  "uwe",
  "gerd",
  "gisela",
  "ingrid",
  "renate",
  "brigitte",
  "christa",
  "gudrun",
  "erika",
  "hannelore",
  "waltraud",
  "karin",
  "ute",
  "marlene",
  "helga",
  "edith",
  "ilse",
  "greta",
  "hilde",
  "frieda",
  "gerda",
  "annelie",
  "kerstin",
  "silke",
  "antje",
  "katja",
  "nadine",
  "jana",
  "franziska",
  "vanessa",
  "michaela",
  "nicole",
  "jasmin",
  "lena",
  "johanna",
  "clara",
  "ida",
  "luisa",
  "paula",
  "romy",
  "tessa",
  "vivien",
  "wiebke",
  "ivan",
  "dmitri",
  "sergei",
  "vladimir",
  "alexei",
  "nikolai",
  "andrei",
  "olga",
  "natasha",
  "tatiana",
  "svetlana",
  "irina",
  "yulia",
  "raj",
  "amit",
  "vikram",
  "arjun",
  "rahul",
  "sanjay",
  "ravi",
  "ajay",
  "priya",
  "deepa",
  "anita",
  "sunita",
  "pooja",
  "neha",
  "kavita",
  "imran",
  "farhan",
  "bilal",
  "usman",
  "zainab",
  "ayesha",
  "hina",
  "wei",
  "jing",
  "yan",
  "hiroshi",
  "yuki",
  "kenji",
  "minjun",
  "jiwoo",
  "seoyeon",
  "hyun",
  "jisoo",
  "minh",
  "linh",
  "hoa",
  "tuan",
  "duc",
  "somchai",
  "siriporn",
  "kwame",
  "kofi",
  "ama",
  "abena",
  "chidi",
  "ngozi",
  "amara",
  "zola",
  "thabo",
  "sipho",
];

function tokenize(pw: string): string[] {
  const runs = pw.split(/[^A-Za-z]+/).filter(Boolean);
  const tokens: string[] = [];
  runs.forEach((run) => {
    const parts = run.replace(/([a-z])([A-Z])/g, "$1\u0001$2").split("\u0001");
    parts.forEach((p) => {
      if (p) tokens.push(p.toLowerCase());
    });
  });
  return tokens;
}

function nameTokenCount(pw: string): number {
  return tokenize(pw).filter((t) => NAMES.includes(t)).length;
}

function containsName(pw: string): boolean {
  const lower = pw.toLowerCase();
  return NAMES.some((name) => lower.includes(name));
}

function hasSequential(pw: string): boolean {
  const lower = pw.toLowerCase();
  return LATIN_SEQUENCES.some((seq) => {
    for (let i = 0; i <= seq.length - 3; i++) {
      const chunk = seq.slice(i, i + 3);
      const rev = [...chunk].reverse().join("");
      if (lower.includes(chunk) || lower.includes(rev)) return true;
    }
    return false;
  });
}

function hasArabicSequential(pw: string): boolean {
  return ARABIC_ROWS.some((seq) => {
    for (let i = 0; i <= seq.length - 3; i++) {
      const chunk = seq.slice(i, i + 3);
      const rev = [...chunk].reverse().join("");
      if (pw.includes(chunk) || pw.includes(rev)) return true;
    }
    return false;
  });
}

function isEnglishChunk(chunk: string): boolean {
  return (
    EN_TOP.includes(chunk) ||
    EN_HOME.includes(chunk) ||
    EN_BOTTOM.includes(chunk)
  );
}

function hasRegionalSequential(pw: string, rows: string[]): boolean {
  const lower = pw.toLowerCase();
  return rows.some((seq) => {
    for (let i = 0; i <= seq.length - 3; i++) {
      const chunk = seq.slice(i, i + 3);
      if (isEnglishChunk(chunk)) continue;
      const rev = [...chunk].reverse().join("");
      if (lower.includes(chunk) || lower.includes(rev)) return true;
    }
    return false;
  });
}

function hasRepeats(pw: string): boolean {
  return /(.)\1{2,}/.test(pw);
}

function isMaskPattern(pw: string): boolean {
  return /^[A-Za-z]{3,}\d{1,4}[!@#$%^&*]?$/.test(pw);
}

function isDictionaryLike(pw: string): boolean {
  return /^[A-Za-z]+$/.test(pw) && pw.length <= 10;
}

function deleet(pw: string): string {
  return pw
    .toLowerCase()
    .replace(/@/g, "a")
    .replace(/4/g, "a")
    .replace(/3/g, "e")
    .replace(/1/g, "i")
    .replace(/!/g, "i")
    .replace(/0/g, "o")
    .replace(/5/g, "s")
    .replace(/\$/g, "s")
    .replace(/7/g, "t")
    .replace(/8/g, "b");
}

export type StrengthLevel = 0 | 1 | 2 | 3 | 4;

export type CrackBucket =
  | "instant"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "months"
  | "years"
  | "centuries";

function crackTimeBucket(seconds: number): CrackBucket {
  if (!isFinite(seconds) || seconds < 1) return "instant";
  if (seconds < 60) return "seconds";
  if (seconds < 3600) return "minutes";
  if (seconds < 86400) return "hours";
  if (seconds < 2592000) return "days";
  if (seconds < 31536000) return "months";
  if (seconds < 3153600000) return "years";
  return "centuries";
}

export interface PasswordAnalysis {
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  isCommon: boolean;
  hasPattern: boolean;
  hasLatinPattern: boolean;
  hasArabicPattern: boolean;
  hasTurkishPattern: boolean;
  hasGermanPattern: boolean;
  hasName: boolean;
  nameCount: number;
  leetCommon: boolean;
  leetWord: boolean;
  isMaskPattern: boolean;
  isDictionaryWord: boolean;
  level: StrengthLevel;
  entropyBits: number;
  crackOnline: CrackBucket;
  crackOfflineFast: CrackBucket;
  crackOfflineSlow: CrackBucket;
}

const RATE_ONLINE_PER_SEC = 100 / 3600;
const RATE_OFFLINE_FAST_PER_SEC = 1e10;
const RATE_OFFLINE_SLOW_PER_SEC = 1e4;

export function analyzePassword(pw: string): PasswordAnalysis {
  const length = pw.length;
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSymbol = /[^a-zA-Z0-9]/.test(pw);
  const isCommon = COMMON_PASSWORDS.has(pw.toLowerCase());
  const hasLatinPattern = hasSequential(pw) || hasRepeats(pw);
  const hasArabicPattern = hasArabicSequential(pw);
  const hasTurkishPattern = hasRegionalSequential(pw, TURKISH_ROWS);
  const hasGermanPattern = hasRegionalSequential(pw, GERMAN_ROWS);
  const hasPattern =
    hasLatinPattern ||
    hasArabicPattern ||
    hasTurkishPattern ||
    hasGermanPattern;
  const hasName = containsName(pw);
  const nameCount = nameTokenCount(pw);
  const maskPattern = isMaskPattern(pw);
  const dictionaryWord = isDictionaryLike(pw);

  const deleeted = deleet(pw);
  const changedByLeet = length > 0 && deleeted !== pw.toLowerCase();
  const leetCommon = changedByLeet && COMMON_PASSWORDS.has(deleeted);
  const leetWord =
    changedByLeet &&
    !leetCommon &&
    (NAMES.includes(deleeted) ||
      (/^[a-z]+$/.test(deleeted) && deleeted.length <= 10));

  const classCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(
    Boolean,
  ).length;

  let score = 0;
  if (length > 0) {
    score += Math.min(length * 4, 40);
    score += classCount * 12;
    if (length >= 12) score += 8;
    if (length >= 16) score += 4;
    if (hasPattern) score -= 20;
    if (hasName) score = Math.min(score, 15);
    if (nameCount >= 2) score = Math.min(score, 10);
    if (leetWord) score = Math.min(score, 18);
    if (leetCommon) score = Math.min(score, 8);
    if (isCommon) score = Math.min(score, 5);
    score = Math.max(0, Math.min(100, score));
  }

  let level: StrengthLevel;
  if (length === 0) level = 0;
  else if (score < 25) level = 0;
  else if (score < 45) level = 1;
  else if (score < 65) level = 2;
  else if (score < 85) level = 3;
  else level = 4;

  let charset = 0;
  if (hasLower) charset += 26;
  if (hasUpper) charset += 26;
  if (hasNumber) charset += 10;
  if (hasSymbol) charset += 32;
  const entropyBits =
    length > 0 && charset > 0 ? length * Math.log2(charset) : 0;
  const guesses = Math.pow(2, Math.min(entropyBits, 1024));
  const instantOverride = isCommon || leetCommon;

  return {
    length,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    isCommon,
    hasPattern,
    hasLatinPattern,
    hasArabicPattern,
    hasTurkishPattern,
    hasGermanPattern,
    hasName,
    nameCount,
    leetCommon,
    leetWord,
    isMaskPattern: maskPattern,
    isDictionaryWord: dictionaryWord,
    level,
    entropyBits: Math.round(entropyBits),
    crackOnline: instantOverride
      ? "instant"
      : crackTimeBucket(guesses / RATE_ONLINE_PER_SEC),
    crackOfflineFast: instantOverride
      ? "instant"
      : crackTimeBucket(guesses / RATE_OFFLINE_FAST_PER_SEC),
    crackOfflineSlow: instantOverride
      ? "instant"
      : crackTimeBucket(guesses / RATE_OFFLINE_SLOW_PER_SEC),
  };
}

export type TipKey =
  | "commonBreach"
  | "leetCommonBreach"
  | "fullName"
  | "singleName"
  | "maskPattern"
  | "latinKeyboardPattern"
  | "arabicKeyboardPattern"
  | "turkishKeyboardPattern"
  | "germanKeyboardPattern"
  | "leetSubstitution"
  | "dictionaryWord"
  | "shortLength"
  | "noWeakness"
  | "credentialStuffing"
  | "phishing"
  | "socialMining";

export function buildTipKeys(a: PasswordAnalysis): TipKey[] {
  const tips: TipKey[] = [];
  if (a.isCommon) tips.push("commonBreach");
  if (a.leetCommon) tips.push("leetCommonBreach");
  if (a.nameCount >= 2) tips.push("fullName");
  else if (a.hasName) tips.push("singleName");
  if (a.isMaskPattern) tips.push("maskPattern");
  if (a.hasLatinPattern) tips.push("latinKeyboardPattern");
  if (a.hasArabicPattern) tips.push("arabicKeyboardPattern");
  if (a.hasTurkishPattern) tips.push("turkishKeyboardPattern");
  if (a.hasGermanPattern) tips.push("germanKeyboardPattern");
  if (a.leetWord && !a.leetCommon) tips.push("leetSubstitution");
  if (a.isDictionaryWord && !a.hasName) tips.push("dictionaryWord");
  if (a.length > 0 && a.length < 12) tips.push("shortLength");

  if (tips.length === 0 && a.length > 0) tips.push("noWeakness");

  if (a.length > 0) {
    tips.push("credentialStuffing");
    tips.push("phishing");
    tips.push("socialMining");
  }
  return tips;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = [];
  for (let i = 0; i <= m; i++) dp.push([i]);
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[m][n];
}

export function passwordSimilarity(a: string, b: string): number {
  const dist = levenshtein(a.toLowerCase(), b.toLowerCase());
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 0;
  return 1 - dist / maxLen;
}
