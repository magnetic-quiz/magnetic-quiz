// components/IntroResultContent.tsx
import { useState, useEffect } from "react";
import { Question } from "../../types/question";

interface IntroResultContentProps {
  question: Question;
  onUpdateQuestion: (updatedQuestion: Question) => void;
}

export const IntroResultContent = ({
  question,
  onUpdateQuestion,
}: IntroResultContentProps) => {
  const [headline, setHeadline] = useState(question.headline || "");
  const [paragraph, setParagraph] = useState(question.paragraph || "");

  useEffect(() => {
    setHeadline(question.headline || "");
    setParagraph(question.paragraph || "");
  }, [question]);

  const handleHeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeadline(e.target.value);
    onUpdateQuestion({ ...question, headline: e.target.value });
  };

  const handleParagraphChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setParagraph(e.target.value);
    onUpdateQuestion({ ...question, paragraph: e.target.value });
  };

  return (
    <div className="p-8 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {question.type === "intro" ? "Edit Intro Page" : "Edit Result Page"}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Headline
        </label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          value={headline}
          onChange={handleHeadlineChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Paragraph
        </label>
        <textarea
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          value={paragraph}
          onChange={handleParagraphChange}
        />
      </div>
    </div>
  );
};
