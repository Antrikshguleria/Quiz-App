import React from 'react';
import { FaPlayCircle, FaClock, FaQuestionCircle, FaStar, FaListUl, FaPlusCircle, FaExclamationCircle } from 'react-icons/fa';

const QuizCard = ({ quizData, onStartQuiz }) => {
  return (
    // <div className="bg-[#c8d8e4] p-8 rounded-3xl shadow-2xl w-[500px] mx-auto mt-16 
    // transition-all duration-300 hover:scale-105 hover:shadow-2xl"></div>
    <div className="bg-[#c8d8e4] p-8 rounded-3xl shadow-2xl w-[500px] mx-auto mt-16 
    transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-4xl font-extrabold text-[#2b6777] text-center mb-6">{quizData.title}</h2>

      <div className="space-y-5">
        <div className="flex items-center text-lg">
          <FaQuestionCircle className="mr-3 text-[#2b6777] text-2xl" />
          <span className="font-semibold text-[#2b6777]">Topic:</span>
          <span className="ml-2 text-[#2b6777]">{quizData.topic}</span>
        </div>

        <div className="flex items-center text-lg">
          <FaStar className="mr-3 text-yellow-500 text-2xl" />
          <span className="font-semibold text-[#2b6777]">Difficulty Level:</span>
          <span className="ml-2 text-[#2b6777]">{quizData.difficulty_level || "Let's find out"}</span>
        </div>

        <div className="flex items-center text-lg">
          <FaListUl className="mr-3 text-[#2b6777] text-2xl" />
          <span className="font-semibold text-[#2b6777]">Number of Questions:</span>
          <span className="ml-2 text-[#2b6777]">{quizData.questions_count}</span>
        </div>

        <div className="flex items-center text-lg">
          <FaPlusCircle className="mr-3 text-green-500 text-2xl" />
          <span className="font-semibold text-[#2b6777]">Correct Marks:</span>
          <span className="ml-2 text-[#2b6777]">{quizData.correct_answer_marks}</span>
        </div>

        <div className="flex items-center text-lg">
          <FaExclamationCircle className="mr-3 text-red-500 text-2xl" />
          <span className="font-semibold text-[#2b6777]">Negative Marks:</span>
          <span className="ml-2 text-[#2b6777]">{quizData.negative_marks}</span>
        </div>

        <div className="flex items-center text-lg">
          <FaClock className="mr-3 text-[#ff9900] text-2xl" />
          <span className="font-semibold text-[#2b6777]">Duration:</span>
          <span className="ml-2 text-[#2b6777]">{quizData.duration} minutes</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onStartQuiz}
          className="bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-600 flex items-center justify-center mx-auto text-lg"
        >
          <FaPlayCircle className="mr-2 text-2xl" /> Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCard;