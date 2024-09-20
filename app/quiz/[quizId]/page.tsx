// pages/quiz/[quizId].tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import QuizRenderer from "../../components/QuizRenderer";
import { Question } from "../../../types/question";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");

  // Sample quiz data (this could be fetched based on the quizId)
  const [questions] = useState<Question[]>([
    {
      id: -1,
      type: "intro",
      text: "Welcome to the Quiz!",
      options: [],
      headline: "Intro Headline",
      paragraph: "This is the introductory page of the quiz.",
    },
    {
      id: 1,
      type: "mcq",
      text: "What is your favorite color?",
      options: ["Red", "Blue", "Green"],
    },
    {
      id: 2,
      type: "mcq",
      text: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird"],
    },
    {
      id: -2,
      type: "result",
      text: "Thank you for completing the quiz!",
      options: [],
      headline: "Result Headline",
      paragraph: "This is the results page.",
    },
  ]);

  const handleQuizSubmit = () => {
    console.log("Quiz Submitted!");
    // Handle quiz submission logic here
  };

  return (
    <div className="min-h-screen">
      <QuizRenderer questions={questions} onSubmit={handleQuizSubmit} />
    </div>
  );
}
