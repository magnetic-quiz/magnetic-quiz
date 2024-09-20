// pages/create-quiz.tsx
"use client";

import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { MainContent } from "../components/MainContent";
import { IntroResultContent } from "../components/IntroResultContent";
import { Question } from "../../types/question";
import { useRouter } from "next/navigation";
import QuizRenderer from "../components/QuizRenderer";
import Modal from "../components/Modal";

export default function CreateQuiz() {
  const [questions, setQuestions] = useState<Question[]>([
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

  const router = useRouter();

  const handlePreviewQuiz = () => {
    router.push("/preview-quiz");
  };

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      type: "mcq",
      text: "New MCQ Question",
      options: ["Option 1", "Option 2"],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
    if (selectedQuestionId === id) setSelectedQuestionId(null);
  };

  const handleUpdateQuestion = (updatedQuestion: Question) => {
    setQuestions(
      questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  };

  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-100">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleOpenPreview}
          >
            Preview Quiz
          </button>
          <LeftSidebar
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onSelectQuestion={setSelectedQuestionId}
            selectedQuestionId={selectedQuestionId}
          />
        </div>

        <div className="w-1/2 p-6">
          {selectedQuestion ? (
            selectedQuestion.type === "mcq" ? (
              <MainContent
                question={selectedQuestion}
                onUpdateQuestion={handleUpdateQuestion}
              />
            ) : (
              <IntroResultContent
                question={selectedQuestion}
                onUpdateQuestion={handleUpdateQuestion}
              />
            )
          ) : (
            <div>Select a question to edit</div>
          )}
        </div>

        <div className="w-1/4 bg-gray-100">
          <RightSidebar />
        </div>
      </div>
      <Modal isOpen={isPreviewOpen} onClose={handleClosePreview}>
        <QuizRenderer questions={questions} />
      </Modal>
    </div>
  );
}
