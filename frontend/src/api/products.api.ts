import http from "./http";
import type { Product } from "../types/product";

export interface ProductsResponse {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

//GET /products - Fetch a list of products with optional query parameters for pagination, sorting, and filtering
export const fetchProducts = (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
}) => {
  return http.get<ProductsResponse>("/products", { params });
};

//CREATE /products - Add a new product
export const createProduct = (payload: {
  name: string;
  price: number;
  stock: number;
  tags: string[];
  description?: string;
}) => {
  return http.post<Product>("/products", payload);
};