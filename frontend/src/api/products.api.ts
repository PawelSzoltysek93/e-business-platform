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

export const fetchProducts = (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
}) => {
  return http.get<ProductsResponse>("/products", { params });
};
