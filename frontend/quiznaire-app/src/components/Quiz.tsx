import React, { useState, useEffect } from 'react';

// Define the structure of a question
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

// Mock data for the quiz questions
const questions: Question[] = [
  {
    id: 1,
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    correctAnswer: 'Paris',
  },
  {
    id: 2,
    text: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars',
  },
  {
    id: 3,
    text: 'Who wrote the play \'Romeo and Juliet\'?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correctAnswer: 'William Shakespeare',
  },
];

interface QuizProps {
  categoryId: number;
  onQuizComplete: () => void;
  onScoreUpdate: () => void;
}

const Quiz: React.FC<QuizProps> = ({ categoryId, onQuizComplete, onScoreUpdate }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      onQuizComplete();
      return;
    }

    if (showAnswer) return;

    if (timeLeft === 0) {
      setShowAnswer(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, showAnswer, currentQuestionIndex, onQuizComplete]);

  if (currentQuestionIndex === questions.length) {
    return <div>Quiz Completed!</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (option: string) => {
    if (option === currentQuestion.correctAnswer) {
      onScoreUpdate();
    }
    setSelectedAnswer(option);
    setShowAnswer(true);
  };

  const handleNextClick = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    setTimeLeft(10);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const getButtonClassName = (option: string) => {
    if (!showAnswer) {
      return 'option-button';
    }
    if (option === currentQuestion.correctAnswer) {
      return 'option-button correct';
    }
    if (option === selectedAnswer) {
      return 'option-button incorrect';
    }
    return 'option-button';
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{currentQuestion.text}</h2>
        <div className="timer">Time Left: {timeLeft}s</div>
      </div>
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={getButtonClassName(option)}
            onClick={() => handleAnswerClick(option)}
            disabled={showAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswer && (
        <button onClick={handleNextClick} className="next-button">
          Next
        </button>
      )}
    </div>
  );
};

export default Quiz;
