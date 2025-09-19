import React, { useState } from 'react';
import './App.css';
import CategoryList from './components/CategoryList.tsx';
import Quiz from './components/Quiz.tsx';

const App: React.FC = () => {
  // State to hold the selected category ID. null means no category is selected.
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Handler function to be passed to the CategoryList component
  const handleSelectCategory = (id: number) => {
    setSelectedCategory(id);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{selectedCategory ? 'Quiz Time!' : 'Choose a Category'}</h1>
      </header>
      <main>
        {selectedCategory === null ? (
          <CategoryList onSelectCategory={handleSelectCategory} />
        ) : (
          <Quiz categoryId={selectedCategory} />
        )}
      </main>
    </div>
  );
}

export default App;
