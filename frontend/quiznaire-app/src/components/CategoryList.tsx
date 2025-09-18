import React from 'react';

// Define a type for a single category
interface Category {
  id: number;
  name: string;
}

const categories: Category[] = [
  { id: 1, name: 'History' },
  { id: 2, name: 'Science' },
  { id: 3, name: 'Movies' },
  { id: 4, name: 'General Knowledge' },
];

// Type the component as a React Functional Component (React.FC)
const CategoryList: React.FC = () => {
  return (
    <div className="category-list">
      {categories.map(category => (
        <div key={category.id} className="category">
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
