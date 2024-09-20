// components/LeftSidebar.tsx
import { Question } from "../../types/question";

interface LeftSidebarProps {
  questions: Question[];
  onAddQuestion: () => void;
  onDeleteQuestion: (id: number) => void;
  onSelectQuestion: (id: number) => void;
  selectedQuestionId: number | null;
}

export const LeftSidebar = ({
  questions,
  onAddQuestion,
  onDeleteQuestion,
  onSelectQuestion,
  selectedQuestionId,
}: LeftSidebarProps) => {
  return (
    <div className="bg-gray-100 p-4 space-y-4">
      <h2 className="text-lg font-bold">Quiz Structure</h2>

      <h3 className="text-sm font-semibold">Intro</h3>
      <div
        className={`py-2 px-4 bg-white rounded-md shadow-sm cursor-pointer ${
          selectedQuestionId === -1 ? "bg-blue-100" : ""
        }`}
        onClick={() => onSelectQuestion(-1)}
      >
        Intro Page
      </div>

      <h3 className="text-sm font-semibold mt-4">Questions</h3>
      <ol className="list-decimal pl-4 space-y-2">
        {questions
          .filter((question) => question.type === "mcq")
          .map((question) => (
            <li
              key={question.id}
              className={`py-2 px-4 bg-white rounded-md shadow-sm cursor-pointer ${
                selectedQuestionId === question.id ? "bg-blue-100" : ""
              }`}
              onClick={() => onSelectQuestion(question.id)}
            >
              {question.text}
              <button
                className="ml-4 text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteQuestion(question.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
      </ol>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full mt-4"
        onClick={onAddQuestion}
      >
        Add New Question
      </button>
      <h3 className="text-sm font-semibold mt-4">Result</h3>
      <div
        className={`py-2 px-4 bg-white rounded-md shadow-sm cursor-pointer ${
          selectedQuestionId === -2 ? "bg-blue-100" : ""
        }`}
        onClick={() => onSelectQuestion(-2)}
      >
        Result Page
      </div>
    </div>
  );
};
