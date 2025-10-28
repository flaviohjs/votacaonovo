import React, { useState, useCallback } from 'react';
import type { Dish, ExperienceRating, ExperienceVotes } from './types';
import VotingPage from './VotingPage';
import AdminPage from './AdminPage';

// FIX: Added imageUrl property to each dish object.
const INITIAL_DISHES: Dish[] = [
  { id: 1, name: 'Moqueca Capixaba', description: 'Um clássico da culinária brasileira, com peixe branco, camarão e um delicioso molho.', votes: 12, imageUrl: 'https://placehold.co/400x400/1e40af/ffffff/png?text=Moqueca' },
  { id: 2, name: 'Picanha na Chapa', description: 'Suculenta picanha fatiada, servida com farofa de ovos e vinagrege.', votes: 25, imageUrl: 'https://placehold.co/400x400/1e40af/ffffff/png?text=Picanha' },
  { id: 3, name: 'Bobó de Camarão', description: 'Creme aveludado de aipim com camarões refogados no azeite de dendê.', votes: 8, imageUrl: 'https://placehold.co/400x400/1e40af/ffffff/png?text=Bobó' },
  { id: 4, name: 'Feijoada Completa', description: 'A tradicional feijoada brasileira, acompanhada de arroz, couve e laranja.', votes: 18, imageUrl: 'https://placehold.co/400x400/1e40af/ffffff/png?text=Feijoada' },
  { id: 5, name: 'Salmão Grelhado', description: 'Posta de salmão grelhado com molho de maracujá e purê de batata baroa.', votes: 15, imageUrl: 'https://placehold.co/400x400/1e40af/ffffff/png?text=Salmão' },
  { id: 6, name: 'Risoto de Frutos do Mar', description: 'Arroz arbóreo cremoso com lula, polvo, mexilhões e camarões frescos.', votes: 20, imageUrl: 'https://placehold.co/400x400/1e40af/ffffff/png?text=Risoto' },
];

const INITIAL_EXPERIENCE_VOTES: ExperienceVotes = {
  ruim: 5,
  regular: 12,
  bom: 35,
  otimo: 48,
};


const App: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>(INITIAL_DISHES);
  const [experienceVotes, setExperienceVotes] = useState<ExperienceVotes>(INITIAL_EXPERIENCE_VOTES);

  // O roteamento é simulado aqui para demonstração.
  const path = window.location.pathname;

  // Handler para a lista de pratos (usado pelo Admin)
  const updateDishesList = useCallback((newDishes: Dish[]) => {
    // Em uma app real, isso faria uma chamada de API para o backend.
    setDishes(newDishes);
  }, []);

  // Handler para votos nos pratos (usado pela Página de Votação)
  const handleDishVote = useCallback((dishId: number) => {
    setDishes(currentDishes =>
      currentDishes.map(dish =>
        dish.id === dishId ? { ...dish, votes: dish.votes + 1 } : dish
      )
    );
     console.log(`Voto computado para o prato ${dishId}.`);
  }, []);

  // Handler para votos de experiência (usado pela Página de Votação)
  const handleExperienceVote = useCallback((rating: ExperienceRating) => {
    setExperienceVotes(prevVotes => ({
      ...prevVotes,
      [rating]: prevVotes[rating] + 1,
    }));
    console.log(`Voto de experiência '${rating}' computado.`);
  }, []);


  if (path === '/admin') {
    return (
      <AdminPage 
        dishes={dishes} 
        setDishes={updateDishesList} 
        experienceVotes={experienceVotes} 
      />
    );
  }
  
  return (
    <VotingPage 
      dishes={dishes} 
      onDishVote={handleDishVote} 
      onExperienceVote={handleExperienceVote}
    />
  );
};

export default App;
