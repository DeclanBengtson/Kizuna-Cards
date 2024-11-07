import React, { useState } from 'react';
import { Plus, X, Edit2, Save, XCircle } from 'lucide-react';

const QuestionInput = ({ questions, setQuestions }) => {
  const [question, setQuestion] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddQuestion = () => {
    if (question.trim()) {
      setQuestions([...questions, question.trim()]);
      setQuestion('');
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Questions</label>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Type your question"
            onKeyPress={(e) => e.key === 'Enter' && handleAddQuestion()}
          />
          <button
            type="button"
            onClick={handleAddQuestion}
            className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {questions.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
            <div className="space-y-2">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                >
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 px-3 py-1 border rounded mr-2"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1">{q}</span>
                  )}
                  <div className="flex space-x-2">
                    {editIndex === index ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            const newQuestions = [...questions];
                            newQuestions[index] = editText;
                            setQuestions(newQuestions);
                            setEditIndex(null);
                          }}
                          className="text-green-500 hover:text-green-600"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditIndex(null)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setEditIndex(index);
                            setEditText(q);
                          }}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-600"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionInput;
