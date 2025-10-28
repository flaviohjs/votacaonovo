import React from 'react';
import type { Dish, ExperienceRating, ExperienceVotes } from './types';
import { Header } from './components/Header';
import { ExperienceVoting } from './components/ExperienceVoting';
import { DishCard } from './components/DishCard';

interface VotingPageProps {
  dishes: Dish[];
  onDishVote: (dishId: number) => void;
  onExperienceVote: (rating: ExperienceRating) => void;
}

const DishVotingPanel: React.FC<{dishes: Dish[], onVote: (id: number) => void}> = ({ dishes, onVote }) => (
  <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col h-full">
    <div className="shrink-0 text-center">
      <h2 className="text-xl md:text-2xl font-bold text-gray-700">
        <span className="text-blue-600 font-semibold">Passo 2:</span> Vote no seu Prato Favorito
      </h2>
      <p className="text-gray-500 mt-1 mb-4 text-sm">Ajude-nos a escolher os melhores sabores.</p>
    </div>
    <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
      {dishes.map(dish => (
        <DishCard key={dish.id} dish={dish} onVote={onVote} />
      ))}
    </div>
  </div>
);


const VotingPage: React.FC<VotingPageProps> = ({ dishes, onDishVote, onExperienceVote }) => {
  return (
    <div className="bg-gray-100 h-screen text-gray-800 flex flex-col overflow-hidden">
      <Header />
      <main className="container mx-auto p-4 md:p-6 flex-grow flex flex-col md:flex-row md:gap-6 min-h-0">
        
        <div className="md:w-2/5 lg:w-1/3 shrink-0 mb-4 md:mb-0">
          <ExperienceVoting onVote={onExperienceVote} />
        </div>
        
        <div className="flex-grow min-h-0">
           <DishVotingPanel dishes={dishes} onVote={onDishVote} />
        </div>

      </main>
       <footer className="text-center p-4 bg-slate-800 text-white text-sm shrink-0">
        <p>&copy; {new Date().getFullYear()} Clube Naval - Sede Social. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default VotingPage;
