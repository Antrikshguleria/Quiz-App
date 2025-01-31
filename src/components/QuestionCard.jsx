import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Icons for correct and incorrect answers

const QuestionCard = ({ question, onAnswerSelect, selectedAnswer, answerStatus }) => {
  return (
    <div className="bg-[#c8d8e4] p-6 rounded-3xl shadow-xl max-w-3xl mx-auto mb-8">
      <h3 className="text-2xl font-extrabold text-[#2b6777] text-center mb-4">
        <span className="text-[#2b6777]">Question</span>
      </h3>
      <div className="text-xl font-semibold text-[#2b6777] mb-4 text-center">
        {question.description}
      </div>
      
      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswerSelect(option)}
            className={`block w-full p-4 text-left rounded-lg transition-all ${
              selectedAnswer === option
                ? answerStatus === 'correct'
                  ? 'bg-green-500 text-white border-4 border-green-700'
                  : 'bg-red-500 text-white border-4 border-red-700'
                : 'bg-[#c8d8e4] border-2 border-[#2b6777] hover:bg-[#2b6777] hover:text-white'
            }`}
          >
            {option.description}
          </button>
        ))}
      </div>

      {answerStatus && (
        <div className={`p-3 mt-4 rounded-md text-center text-white ${
          answerStatus === 'correct'
            ? 'bg-green-500'
            : 'bg-red-500'
        }`}>
          <div className="flex items-center justify-center">
            {answerStatus === 'correct' ? (
              <FaCheckCircle className="mr-2 text-3xl text-white" />
            ) : (
              <FaTimesCircle className="mr-2 text-3xl text-white" />
            )}
            <span className="text-xl font-bold">
              {answerStatus === 'correct' ? 'Correct Answer!' : 'Wrong Answer!'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;