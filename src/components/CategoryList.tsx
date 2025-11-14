import React from 'react';

import { categories } from '../data/categories.ts';

// Define the properties for the component
interface CategoryListProps {
  onSelectCategory: (id: number) => void;
}

// Type the component as a React Functional Component (React.FC)
const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  return (
    <div className="category-list">
      {categories.map(category => (
        <div
          key={category.id}
          className="category"
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
