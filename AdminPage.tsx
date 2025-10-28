import React from 'react';
import type { Dish, ExperienceVotes } from './types';
import { Header } from './components/Header';
import { DishManagement } from './components/DishManagement';
import { AdminPanel } from './components/AdminPanel';

interface AdminPageProps {
  dishes: Dish[];
  setDishes: (dishes: Dish[]) => void;
  experienceVotes: ExperienceVotes;
}

const AdminPage: React.FC<AdminPageProps> = ({ dishes, setDishes, experienceVotes }) => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="container mx-auto p-4 md:p-6 flex-grow overflow-y-auto">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Painel de Administração</h1>
            <p className="text-gray-600 mb-8">Gerencie os pratos e acesse os relatórios de votação.</p>

            {/* Placeholder para a integração de login */}
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-8" role="alert">
              <p className="font-bold">Integração com Active Directory</p>
              <p>Esta área seria protegida por um sistema de login integrado ao seu AD local para garantir o acesso seguro.</p>
            </div>
            
            <DishManagement dishes={dishes} setDishes={setDishes} />

            <div className="mt-8">
              <AdminPanel dishes={dishes} experienceVotes={experienceVotes} />
            </div>
        </div>
      </main>
      <footer className="text-center p-4 bg-slate-800 text-white text-sm shrink-0">
        <p>&copy; {new Date().getFullYear()} Clube Naval - Sede Social. Painel Administrativo.</p>
      </footer>
    </div>
  );
};

export default AdminPage;
