export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryName: string;
  categoryId: number;
  image?: string;
  oldPrice?: number;
  saveAmount?: number;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
}