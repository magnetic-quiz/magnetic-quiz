// types/question.ts
export interface Question {
  id: number;
  text: string;
  options: string[]; // Only MCQ options
}
