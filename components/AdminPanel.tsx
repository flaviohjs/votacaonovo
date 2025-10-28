import React from 'react';
import type { Dish, ExperienceVotes, ExperienceRating } from '../types';

interface AdminPanelProps {
  dishes: Dish[];
  experienceVotes: ExperienceVotes;
}

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


export const AdminPanel: React.FC<AdminPanelProps> = ({ dishes, experienceVotes }) => {

  const handleExport = () => {
    const headers = ['Tipo de Dado', 'Item', 'Votos'];
    
    const dishRows = dishes.map(dish => 
        ['Prato', `"${dish.name.replace(/"/g, '""')}"`, dish.votes]
    );

    const experienceRows = (Object.keys(experienceVotes) as ExperienceRating[]).map(key => {
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
        return ['Experiência', formattedKey, experienceVotes[key]];
    });

    const allRows = [headers, ...dishRows, ...experienceRows];
    const csvContent = "data:text/csv;charset=utf-8," 
        + allRows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const timestamp = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `relatorio_votacao_culinaria_${timestamp}.csv`);
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-100 border border-slate-300 rounded-xl p-4 text-center">
      <h2 className="text-lg md:text-xl font-bold text-slate-700 mb-1">Relatórios</h2>
      <p className="text-slate-600 mb-4 text-sm md:text-base">Exporte os dados de votação atuais para um arquivo CSV.</p>
      <button
        onClick={handleExport}
        className="inline-flex items-center justify-center bg-gray-700 text-white font-bold py-2 px-5 rounded-full text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300"
      >
        <DownloadIcon />
        Exportar Relatório (CSV)
      </button>
    </div>
  );
};
