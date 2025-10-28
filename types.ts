export interface Dish {
  id: number;
  name: string;
  description: string;
  votes: number;
  // FIX: Add imageUrl property to the Dish interface.
  imageUrl: string;
}

export type ExperienceRating = 'ruim' | 'regular' | 'bom' | 'otimo';

export type ExperienceVotes = Record<ExperienceRating, number>;
