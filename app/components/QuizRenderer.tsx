// components/QuizRenderer.tsx
import { useState } from "react";
import { Question } from "../../types/question";

interface QuizRendererProps {
  questions: Question[];
  onSubmit?: () => void; // Optional callback for handling quiz submission
}

export default function QuizRenderer({
  questions,
  onSubmit,
}: QuizRendererProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]); // Store user answers

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = index;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 2) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 2) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(1); // Move to the first MCQ question
  };

  const handleSubmitQuiz = () => {
    setCurrentQuestionIndex(questions.length - 1); // Move to the result page
    if (onSubmit) onSubmit(); // Trigger the submit callback if provided
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-3/4 lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        {currentQuestion.type === "intro" && (
          <div>
            <h2 className="text-2xl font-bold">{currentQuestion.headline}</h2>
            <p className="mt-4">{currentQuestion.paragraph}</p>
            <button
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>
          </div>
        )}

        {currentQuestion.type === "mcq" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {currentQuestion.text}
            </h2>
            <ul className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <li
                  key={index}
                  className="bg-gray-200 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-300"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </li>
              ))}
            </ul>

            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex <= 1}
              >
                Previous
              </button>

              {currentQuestionIndex < questions.length - 2 ? (
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        )}

        {currentQuestion.type === "result" && (
          <div>
            <h2 className="text-2xl font-bold">{currentQuestion.headline}</h2>
            <p className="mt-4">{currentQuestion.paragraph}</p>
          </div>
        )}
      </div>
    </div>
  );
}
