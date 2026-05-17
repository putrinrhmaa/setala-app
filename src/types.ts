export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  distance: number;
  rating: number;
  imageUrl: string;
  tags: string[];
  matchScore?: number;
  facilities: string[];
  culture: string;
  food: string[];
  language: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface CriteriaWeights {
  budget: number;
  distance: number;
  facilities: number;
  rating: number;
}
