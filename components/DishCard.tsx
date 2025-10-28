import React, { useState } from 'react';
import type { Dish } from '../types';

interface DishCardProps {
  dish: Dish;
  onVote: (id: number) => void;
}

const VoteIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
  </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const DishCard: React.FC<DishCardProps> = ({ dish, onVote }) => {
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (voted) return;
    onVote(dish.id);
    setVoted(true);
    // O feedback visual dura 2 segundos e depois reseta
    setTimeout(() => setVoted(false), 2000);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 flex flex-col ${voted ? 'ring-2 ring-green-500' : 'hover:shadow-xl'}`}>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-800">{dish.name}</h3>
        <p className="text-xs text-gray-600 my-2 flex-grow">{dish.description}</p>
        <div className="flex justify-end items-center mt-auto">
          <button
            onClick={handleVote}
            disabled={voted}
            className={`flex items-center justify-center font-bold py-1 px-3 rounded-full text-xs transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50
              ${voted
                ? 'bg-green-600 text-white cursor-default focus:ring-green-400'
                : 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-500'
              }`}
          >
           {voted ? (
             <>
               <CheckIcon /> Votado!
             </>
           ) : (
             <>
               <VoteIcon /> Votar
             </>
           )}
          </button>
        </div>
      </div>
    </div>
  );
};