// components/QuestionInput.js
import React, { useState } from 'react';

const QuestionInput = ({ questions, setQuestions }) => {
  const [question, setQuestion] = useState('');

  const handleAddQuestion = () => {
    if (question.trim()) {
      setQuestions([...questions, question.trim()]);
      setQuestion('');
    }
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Add Questions</h2>
      <div className="mb-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder="Enter your question"
        />
      </div>
      <button type="button" onClick={handleAddQuestion} className="btn btn-primary w-full mb-4">
        Add Question
      </button>
      <div>
        <h3 className="font-semibold mb-2">Questions List</h3>
        {questions.length === 0 ? (
          <p className="text-gray-500">No questions added yet.</p>
        ) : (
          <ul className="max-h-40 overflow-y-auto list-disc list-inside space-y-2">
            {questions.map((q, index) => (
              <li key={index} className="text-gray-700 flex justify-between items-center">
                <span>{q}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuestionInput;