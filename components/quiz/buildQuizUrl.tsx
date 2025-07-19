export interface QuizParams {
  subject?: string;
  topic?: string;
  mode?: "diagnostic" | "adaptive";
  difficulty?: string;
  questions?: number;
}

export function buildQuizUrl(params: QuizParams): string {
  const searchParams = new URLSearchParams();

  if (params.subject) searchParams.set("subject", params.subject);
  if (params.topic) searchParams.set("topic", params.topic);
  if (params.mode) searchParams.set("mode", params.mode);
  if (params.difficulty) searchParams.set("difficulty", params.difficulty);
  if (params.questions)
    searchParams.set("questions", params.questions.toString());

  const queryString = searchParams.toString();
  return `/quiz${queryString ? `?${queryString}` : ""}`;
}

export function parseQuizParams(searchParams: URLSearchParams): QuizParams {
  return {
    subject: searchParams.get("subject") || undefined,
    topic: searchParams.get("topic") || undefined,
    mode: (searchParams.get("mode") as "diagnostic" | "adaptive") || undefined,
    difficulty: searchParams.get("difficulty") || undefined,
    questions: searchParams.get("questions")
      ? parseInt(searchParams.get("questions")!)
      : undefined,
  };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function calculatePercentage(score: number, total: number): number {
  return Math.round((score / total) * 100);
}

export function getPerformanceLevel(
  percentage: number
): "excellent" | "good" | "fair" | "needsImprovement" | "studyMore" {
  if (percentage >= 90) return "excellent";
  if (percentage >= 80) return "good";
  if (percentage >= 70) return "fair";
  if (percentage >= 60) return "needsImprovement";
  return "studyMore";
}
