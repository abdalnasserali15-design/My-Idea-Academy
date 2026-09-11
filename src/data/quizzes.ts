export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZZES: Record<string, QuizQuestion[]> = {
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

export function getQuiz(slug: string): QuizQuestion[] {
  return QUIZZES[slug] ?? [];
}
