import React, { useState, useEffect } from 'react';

import { categories, Question } from '../data/categories.ts';

interface QuizProps {
  categoryId: number;
  onQuizComplete: () => void;
  onScoreUpdate: () => void;
}

const Quiz: React.FC<QuizProps> = ({ categoryId, onQuizComplete, onScoreUpdate }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimeLeft(30);

      try {
        const currCategory = categories.find(c => c.id === categoryId);
        if(currCategory) {
          const questionModule = await import(`../data/${currCategory.file}`);
          const allQuestions: Question[] = questionModule.default;
          setQuestions(shuffleArray(allQuestions).slice(0, 10));
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const options = shuffleArray([
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ]);
      setShuffledOptions(options);
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (questions.length === 0 || currentQuestionIndex === questions.length) {
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
  }, [timeLeft, showAnswer, currentQuestionIndex, onQuizComplete, questions, loading]);

  if(loading) {
    return <div>Loading...</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available for this category.</div>;
  }
  if (currentQuestionIndex === questions.length) {
    return <div>Quiz Completed!</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (option: string) => {
    if (option === currentQuestion.correct_answer) {
      onScoreUpdate();
    }
    setSelectedAnswer(option);
    setShowAnswer(true);
  };

  const handleNextClick = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    setTimeLeft(30);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const getButtonClassName = (option: string) => {
    if (!showAnswer) {
      return 'option-button';
    }
    if (option === currentQuestion.correct_answer) {
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
        <h2>{currentQuestion.question}</h2>
        <div className="timer">Time Left: {timeLeft}s</div>
      </div>
      <div className="options-container">
        {shuffledOptions.map((option, index) => (
          <button
            key={option}
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
