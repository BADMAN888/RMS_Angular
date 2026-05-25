export interface Dish {
  id: number
  name: string
  description: string
  imageUrl: string
  price: number
  status: 'AVAILABLE' | 'OUT_OF_STOCK'
  categoryId: number
}
