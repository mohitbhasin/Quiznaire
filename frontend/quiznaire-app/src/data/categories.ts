// Define the structure of a question
export interface Question {
    type: string
    difficulty: string
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }
  
  // Define a type for a single category
  export interface Category {
    id: number;
    name: string;
    file: string;
  }
  
  export const categories: Category[] = [
    { id: 1, name: 'Computers', file: 'computers.json' },
    { id: 2, name: 'General Knowledge', file: 'general_knowledge.json' },
    { id: 3, name: 'Science and Nature', file: 'science_and_nature.json' }
  ];  