import React, { useState } from 'react';
import type { Dish } from '../types';
import { DishForm } from './DishForm';

interface DishManagementProps {
  dishes: Dish[];
  setDishes: (dishes: Dish[]) => void;
}

const EditIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
);
const DeleteIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

export const DishManagement: React.FC<DishManagementProps> = ({ dishes, setDishes }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  const handleAddDish = () => {
    setEditingDish(null);
    setIsFormOpen(true);
  };

  const handleEditDish = (dish: Dish) => {
    setEditingDish(dish);
    setIsFormOpen(true);
  };

  const handleDeleteDish = (dishId: number) => {
    if(window.confirm("Tem certeza que deseja remover este prato?")) {
      setDishes(dishes.filter(dish => dish.id !== dishId));
    }
  };

  const handleSaveDish = (dishToSave: Dish) => {
    if (dishToSave.id === 0) { // Novo Prato
      const newDish = { ...dishToSave, id: Date.now(), votes: 0 };
      setDishes([...dishes, newDish]);
    } else { // Editando Prato
      setDishes(dishes.map(dish => dish.id === dishToSave.id ? dishToSave : dish));
    }
    setIsFormOpen(false);
    setEditingDish(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Gerenciar Pratos</h2>
        <button
          onClick={handleAddDish}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Adicionar Novo Prato
        </button>
      </div>

      {isFormOpen && (
        <DishForm
          dish={editingDish}
          onSave={handleSaveDish}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Nome do Prato</th>
              <th className="p-3">Descrição</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map(dish => (
              <tr key={dish.id} className="border-b">
                <td className="p-3 font-medium">{dish.name}</td>
                <td className="p-3 text-sm text-gray-600">{dish.description}</td>
                <td className="p-3 text-center">
                  <button onClick={() => handleEditDish(dish)} className="text-yellow-600 hover:text-yellow-800 font-semibold inline-flex items-center mr-4">
                    <EditIcon /> Editar
                  </button>
                  <button onClick={() => handleDeleteDish(dish.id)} className="text-red-600 hover:text-red-800 font-semibold inline-flex items-center">
                    <DeleteIcon /> Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
