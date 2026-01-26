export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  tags: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}
