import React from 'react';
import { FaTrophy, FaBullseye, FaMedal, FaRedoAlt } from 'react-icons/fa'; // Added more icons
import Confetti from 'react-confetti'; // Import Confetti for party popper effect

const ScoreCard = ({ correctAnswers, wrongAnswers, score, accuracy }) => {
  return (
    <div className="relative bg-[#2b6777] min-h-screen flex items-center justify-center">
      {/* Party popper effect */}
      <Confetti recycle={false} numberOfPieces={200} />

      <div className="bg-[#c8d8e4] p-8 rounded-3xl shadow-xl max-w-3xl w-full mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#2b6777]">Quiz Results</h2>
        <div className="space-y-5">
          <h1 className="text-5xl font-extrabold text-center text-[#2b6777]">Congratulations!</h1>
          
          {/* Final score and accuracy */}
          <div className="flex justify-between items-center text-xl font-semibold">
            <span>Total Score:</span>
            <div className="flex items-center text-2xl font-semibold text-[#2b6777]">
              <FaTrophy className="mr-2 text-yellow-500" /> {/* Trophy icon */}
              <span>{score}</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xl font-semibold">
            <span>Accuracy:</span>
            <div className="flex items-center text-2xl font-semibold text-[#2b6777]">
              <FaBullseye className="mr-2 text-green-500" /> {/* Bullseye icon */}
              <span>{accuracy}%</span>
            </div>
          </div>

          {/* Additional quiz stats */}
          <div className="flex justify-between text-lg font-semibold">
            <span>Correct Answers:</span>
            <div className="flex items-center text-[#2b6777]">
              <FaMedal className="mr-2 text-orange-500" /> {/* Medal icon */}
              <span>{correctAnswers}</span>
            </div>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Wrong Answers:</span>
            <div className="flex items-center text-red-500">
              <FaRedoAlt className="mr-2" /> {/* Reset icon */}
              <span>{wrongAnswers}</span>
            </div>
          </div>
        </div>

        {/* Retry button */}
        <div className="mt-6 text-center">
          <button
            className="bg-[#2b6777] text-white py-3 px-6 rounded-full text-lg font-bold hover:bg-[#1f5e66] transition duration-300 ease-in-out"
            onClick={() => window.location.reload()} // Optionally, reset the quiz by reloading
          >
            Retry Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;