import React from 'react';

interface QuizProps {
  categoryId: number;
}

const Quiz: React.FC<QuizProps> = ({ categoryId }) => {
  return (
    <div>
      <h2>Quiz for Category {categoryId}</h2>
      <p>Question will be displayed here...</p>
    </div>
  );
};

export default Quiz;
