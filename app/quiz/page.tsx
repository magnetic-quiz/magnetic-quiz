// pages/create-quiz.tsx
"use client";

import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { MainContent } from "../components/MainContent";
import { Question } from "../../types/question";

export default function CreateQuiz() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "What is your favorite color?",
      options: ["Red", "Blue", "Green"],
    },
    {
      id: 2,
      text: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird"],
    },
  ]);

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );

  // Handle new question creation (always MCQ)
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: "New MCQ Question",
      options: ["Option 1", "Option 2"],
    };
    setQuestions([...questions, newQuestion]);
  };

  // Handle question deletion
  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
    if (selectedQuestionId === id) setSelectedQuestionId(null); // Unselect if deleted
  };

  // Handle question update
  const handleUpdateQuestion = (updatedQuestion: Question) => {
    setQuestions(
      questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  };

  // Find the selected question by its id
  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Layout */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-gray-100">
          <LeftSidebar
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onSelectQuestion={setSelectedQuestionId}
            selectedQuestionId={selectedQuestionId}
          />
        </div>

        {/* Center Main Content */}
        <div className="w-1/2 p-6">
          {/* Only render MainContent if a question is selected */}
          {selectedQuestion ? (
            <MainContent
              question={selectedQuestion}
              onUpdateQuestion={handleUpdateQuestion}
            />
          ) : (
            <div>Select a question to edit</div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 bg-gray-100">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
