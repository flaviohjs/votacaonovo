import React, { useState, useEffect } from 'react';
import type { Dish } from '../types';

interface DishFormProps {
  dish: Dish | null;
  onSave: (dish: Dish) => void;
  onCancel: () => void;
}

// FIX: Added imageUrl to the empty dish template.
const EMPTY_DISH: Dish = { id: 0, name: '', description: '', votes: 0, imageUrl: '' };

export const DishForm: React.FC<DishFormProps> = ({ dish, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Dish>(EMPTY_DISH);

  useEffect(() => {
    setFormData(dish || EMPTY_DISH);
  }, [dish]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // FIX: Included imageUrl in the form validation check.
    if (formData.name && formData.description && formData.imageUrl) {
      onSave(formData);
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="bg-gray-50 p-6 mb-8 rounded-lg border">
      <h3 className="text-xl font-bold mb-4">{dish ? 'Editar Prato' : 'Adicionar Novo Prato'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nome do Prato</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
            required
          />
        </div>
        {/* FIX: Added a form field for the dish image URL. */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">URL da Imagem</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="https://exemplo.com/imagem.png"
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-400">
            Cancelar
          </button>
          <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">
            Salvar Prato
          </button>
        </div>
      </form>
    </div>
  );
};
