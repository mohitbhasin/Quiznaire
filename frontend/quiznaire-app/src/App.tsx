import React from 'react';
import './App.css';
import CategoryList from './components/CategoryList.tsx';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Choose a Category</h1>
      </header>
      <main>
        <CategoryList />
      </main>
    </div>
  );
}

export default App;
