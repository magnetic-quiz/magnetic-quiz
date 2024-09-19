// components/MainContent.tsx
import { useEffect, useState } from "react";
import { Question } from "../../types/question";

interface MainContentProps {
  question: Question;
  onUpdateQuestion: (updatedQuestion: Question) => void;
}

export const MainContent = ({
  question,
  onUpdateQuestion,
}: MainContentProps) => {
  const [text, setText] = useState(question.text);
  const [options, setOptions] = useState<string[]>(question.options || []);

  // Update the component state when the selected question changes
  useEffect(() => {
    setText(question.text);
    setOptions(question.options);
  }, [question]);

  // Handle text update
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onUpdateQuestion({ ...question, text: e.target.value });
  };

  // Handle MCQ option change
  const handleOptionChange = (index: number, newValue: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = newValue;
    setOptions(updatedOptions);
    onUpdateQuestion({ ...question, options: updatedOptions });
  };

  // Handle adding a new option
  const handleAddOption = () => {
    const newOptions = [...options, `Option ${options.length + 1}`];
    setOptions(newOptions);
    onUpdateQuestion({ ...question, options: newOptions });
  };

  return (
    <div className="p-8 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Question</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Question
        </label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          value={text}
          onChange={handleTextChange}
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">Options</h3>
      {options.map((option, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        </div>
      ))}

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleAddOption}
      >
        Add Option
      </button>
    </div>
  );
};
