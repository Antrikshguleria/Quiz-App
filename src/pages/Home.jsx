import React, { useEffect, useState } from 'react';
import fetchQuizzes from '../api/quizAPI'; 
import QuizCard from '../components/QuizCard';
import QuestionCard from '../components/QuestionCard';
import ProgressBarCard from '../components/ProgressBar';
import ScoreCard from '../components/ScoreCard';

const Home = () => {
  const [quizData, setQuizData] = useState(null);
  const [counter, setCounter] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answerStatus, setAnswerStatus] = useState('');
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [timer, setTimer] = useState(0); // Convert minutes to seconds
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizzes();
        if (data && data.title && data.topic && Array.isArray(data.questions)) {
          setQuizData(data);
          setTimer(data.duration * 60); // Set total duration in seconds
        } else {
          console.error('Unexpected response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    loadQuizData();
  }, []);

  useEffect(() => {
    let timerInterval;
    if (quizStarted && timer > 0 && currentQuestionIndex < quizData?.questions.length) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 || currentQuestionIndex === quizData?.questions.length) {
      handleFinishQuiz();
    }

    return () => clearInterval(timerInterval);
  }, [quizStarted, timer, currentQuestionIndex]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setTimer(quizData.duration * 60); // Set total duration in seconds
    setScore(0); // Reset score
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setQuizFinished(false);
  };

  const handleAnswerSelect = (option) => {
    const correctOption = quizData.questions[currentQuestionIndex].options.find(
      (opt) => opt.is_correct
    );

    if (option.id === correctOption.id) {
      setAnswerStatus('correct');
      setCorrectAnswers((prev) => prev + 1);
      setScore((prevScore) => prevScore + parseInt(quizData.correct_answer_marks, 10));
    //   console.log(quizData.correct_answer_marks);
    } else {
      setAnswerStatus('incorrect');
      setWrongAnswers((prev) => prev + 1);
      setScore((prevScore) => prevScore - parseInt(quizData.negative_marks,10));
    //   console.log(quizData.negative_marks);
    }

    setSelectedAnswer(option);
    // console.log(score);
    setTimeout(handleNextQuestion, 1000); // Move to next question after 1 second
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === quizData.questions.length - 1) {
      setQuizFinished(true); // Finish quiz when last question is reached
    }
    setCounter((prev) => prev + 1);
    setSelectedAnswer(null); // Reset selected answer
    setAnswerStatus(''); // Reset answer status
    setAttemptedQuestions((prev) => prev + 1); // Increment attempted questions
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to the next question
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
        setCounter((prev) => prev - 1);
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1); // Move to previous question
    }
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
  };

  const calculateAccuracy = () => {
    return ((correctAnswers / quizData.questions.length) * 100).toFixed(2);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="container mx-auto p-4">
      {!quizStarted ? (
        quizData ? (
          <QuizCard quizData={quizData} onStartQuiz={handleStartQuiz} />
        ) : (
          <p className="text-center text-lg">Loading quiz...</p>
        )
      ) : quizFinished ? (
        // console.log(score),
        <ScoreCard
          totalQuestions={quizData.questions.length}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          score={score}
          accuracy={calculateAccuracy()}
        />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <ProgressBarCard
              totalQuestions={quizData.questions.length}
              count = {counter}
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-bold text-[#87BAF0] tracking-wide">
             {quizData.title}</h3>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-md">
            <span className="text-xl font-semibold text-red-600 animate-pulse">
                ⏳ {formatTime(timer)}</span>
                </div>
            </div>

          <QuestionCard
            question={quizData.questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            answerStatus={answerStatus}
          />

          <div className="mt-6 flex justify-between items-center">
            <button
                onClick={handlePrevQuestion}
                className="bg-gray-600 text-white py-3 px-6 rounded-full shadow-md 
                        transition-all duration-300 hover:bg-gray-700 disabled:opacity-50"
                disabled={currentQuestionIndex === 0}>
                ⬅ Previous
            </button>

            <button
                onClick={currentQuestionIndex === quizData.questions.length - 1 ? handleFinishQuiz : handleNextQuestion}
                className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-md 
                transition-all duration-300 hover:bg-blue-700">
                {currentQuestionIndex === quizData.questions.length - 1 ? '✅ Finish Quiz' : 'Next ➡'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;