import React, { useState } from 'react';
import './App.css';
import CategoryList from './components/CategoryList.tsx';
import Quiz from './components/Quiz.tsx';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleSelectCategory = (id: number) => {
    setScore(0);
    setSelectedCategory(id);
  };

  const handleQuizComplete = () => {
    setSelectedCategory(null);
  };

  const handleScoreUpdate = () => {
    setScore(prevScore => prevScore + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{selectedCategory ? `Score: ${score}` : 'Choose a Category'}</h1>
      </header>
      <main>
        {selectedCategory === null ? (
          <CategoryList onSelectCategory={handleSelectCategory} />
        ) : (
          <Quiz
            categoryId={selectedCategory}
            onQuizComplete={handleQuizComplete}
            onScoreUpdate={handleScoreUpdate}
          />
        )}
      </main>
    </div>
  );
}

export default App;
