import React, { useState, useEffect } from 'react';
import type { ExperienceVotes, ExperienceRating } from '../types';

interface ExperienceVotingProps {
  onVote: (rating: ExperienceRating) => void;
}

// ... (Ícones permanecem os mesmos) ...
const RuimIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012 15a4.486 4.486 0 00-3.182 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75z" />
  </svg>
);
const RegularIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75zM12 15H12" />
  </svg>
);
const BomIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4.06 4.06 0 01-5.656 0M9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const OtimoIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 01.362.362l-1.512 7.56a.375.375 0 01-.362.362h-4.992a.375.375 0 01-.362-.362l-1.512-7.56a.375.375 0 01.362-.362h7.812zM9 12h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442" />
  </svg>
);
const CheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ratingConfig = {
  otimo: { label: 'Ótimo', color: 'bg-green-500 hover:bg-green-600 focus:ring-green-400', icon: <OtimoIcon /> },
  bom: { label: 'Bom', color: 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-400', icon: <BomIcon /> },
  regular: { label: 'Regular', color: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400', icon: <RegularIcon /> },
  ruim: { label: 'Ruim', color: 'bg-red-500 hover:bg-red-600 focus:ring-red-400', icon: <RuimIcon /> }
};

export const ExperienceVoting: React.FC<ExperienceVotingProps> = ({ onVote }) => {
  const [votedRating, setVotedRating] = useState<ExperienceRating | null>(null);

  useEffect(() => {
    if (votedRating) {
      const timer = setTimeout(() => {
        setVotedRating(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [votedRating]);

  const handleVoteClick = (rating: ExperienceRating) => {
    if (votedRating) return;
    onVote(rating);
    setVotedRating(rating);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 text-center h-full flex flex-col">
      <div className="shrink-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700">
          <span className="text-blue-600 font-semibold">Passo 1:</span> Como foi sua experiência?
        </h2>
        <p className="text-gray-500 mt-1 mb-4 text-sm">Sua avaliação é essencial.</p>
      </div>
      <div className="flex-grow grid grid-cols-2 md:grid-cols-2 gap-3">
        {(Object.keys(ratingConfig).reverse() as ExperienceRating[]).map(key => {
          const config = ratingConfig[key];
          const hasJustVoted = votedRating === key;

          return (
            <div key={key} className="flex flex-col items-center group">
              <button
                onClick={() => handleVoteClick(key)}
                disabled={votedRating !== null}
                className={`w-full h-full text-white font-bold p-2 rounded-lg flex flex-col items-center justify-center transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-opacity-75 shadow-md 
                  ${config.color} 
                  ${votedRating !== null && !hasJustVoted ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
                  ${hasJustVoted ? 'scale-105 shadow-lg' : 'group-hover:-translate-y-1'}`}
                aria-label={`Votar em ${config.label}`}
              >
                {hasJustVoted ? (
                  <>
                    <div className="h-8 w-8 mb-1"><CheckIcon /></div>
                    <span className="text-sm font-semibold">Obrigado!</span>
                  </>
                ) : (
                  <>
                    <div className="h-8 w-8 mb-1">{config.icon}</div>
                    <span className="text-sm">{config.label}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};