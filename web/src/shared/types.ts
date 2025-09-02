export interface Product {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
}

export interface ProductFilters {
  search?: string;
  sort?: 'price' | 'name';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  available?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}