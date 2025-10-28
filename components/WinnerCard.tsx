

import React from 'react';
import type { Dish } from '../types';

interface WinnerCardProps {
  dish: Dish;
  fact: string;
  isLoading: boolean;
  error: string | null;
}

const TrophyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.293 4.293A8 8 0 016.707 15.707a8.001 8.001 0 0110.586-11.414zM10 2a8 8 0 100 16 8 8 0 000-16zM6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
        <path fill="#FFC107" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5-8a5 5 0 1110 0 5 5 0 01-10 0z"></path>
        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 14a1 1 0 01-1 1H6a1 1 0 110-2h3a1 1 0 011 1zm5-10a1 1 0 011.414.086l.5.5a1 1 0 01-1.414 1.414l-.5-.5A1 1 0 0115 6zm-1.586 8.414a1 1 0 010 1.414l-.5.5a1 1 0 11-1.414-1.414l.5-.5a1 1 0 011.414 0zM4 6a1 1 0 011-1h.5a1 1 0 110 2H5a1 1 0 01-1-1zm1 8.586a1 1 0 011.414 0l.5.5a1 1 0 01-1.414 1.414l-.5-.5a1 1 0 010-1.414z"></path>
    </svg>
);


export const WinnerCard: React.FC<WinnerCardProps> = ({ dish, fact, isLoading, error }) => {
  return (
    <div className="bg-gradient-to-br from-blue-800 to-slate-900 text-white p-6 md:p-8 rounded-xl shadow-2xl my-8">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="flex-shrink-0">
          <img src={dish.imageUrl} alt={dish.name} className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-yellow-400 shadow-lg" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-sm uppercase tracking-widest text-yellow-300">Prato Vencedor</h2>
          <h3 className="text-4xl md:text-5xl font-bold my-1">{dish.name}</h3>
          <p className="text-2xl font-semibold text-blue-200">{dish.votes} Votos</p>
          <div className="mt-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h4 className="font-bold text-yellow-300">Curiosidade Gastronômica:</h4>
            {isLoading && <p className="text-blue-200 animate-pulse">Gerando curiosidade com IA...</p>}
            {error && <p className="text-red-300">{error}</p>}
            {!isLoading && !error && <p className="text-blue-100 italic">"{fact}"</p>}
          </div>
        </div>
        <div className="hidden lg:block ml-auto self-center">
            <TrophyIcon />
        </div>
      </div>
    </div>
  );
};
