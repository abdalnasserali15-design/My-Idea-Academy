export interface Lesson {
  title: string;
  body: string;
}

export const LESSONS: Record<string, Lesson[]> = {
  cybersecurity: [],
  ai: [],
  "software-engineering": [],
  networking: [],
  "ethical-hacking": [],
  "data-science": [],
  "cloud-computing": [],
  "operating-systems": [],
  "professional-skills": [],
};

export function getLessons(slug: string): Lesson[] {
  return LESSONS[slug] ?? [];
}
