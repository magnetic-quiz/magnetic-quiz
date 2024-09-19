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
      <h2 className="text-lg font-bold">Questions</h2>
      <ol className="list-decimal pl-4 space-y-2">
        {questions.map((question) => (
          <li
            key={question.id}
            className={`py-2 px-4 bg-white rounded-md shadow-sm cursor-pointer ${
              selectedQuestionId === question.id ? "bg-blue-100" : ""
            }`}
            onClick={() => onSelectQuestion(question.id)} // Update selected question ID
          >
            {question.text}
            <button
              className="ml-4 text-red-500"
              onClick={(e) => {
                e.stopPropagation(); // Prevent selecting when deleting
                onDeleteQuestion(question.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
        onClick={onAddQuestion}
      >
        Add New Question
      </button>
    </div>
  );
};
