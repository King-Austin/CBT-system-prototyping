
export interface User {
  id: string;
  username: string;
  fullName: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  questionCount: number;
}

export interface UserAnswer {
  questionId: string;
  answer: string;
}

export interface ExamResult {
  score: number;
  totalQuestions: number;
  answers: UserAnswer[];
  timeTakenSeconds: number;
}
