export interface Dish {
  id: number;
  name: string;
  description: string;
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'OUT_OF_STOCK' | 'HIDDEN';
  imageUrl: string;
}
