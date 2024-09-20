// types/question.ts
export interface Question {
  id: number;
  text: string;
  type: string;
  options: string[]; // Only MCQ options
  headline?: string;
  paragraph?: string;
}
