export interface Product {
  type: string;
  sku: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface ProductData {
  type: string;
  products: Product[];
}

export interface ProductsResponse {
  code: number;
  description: string;
  data: ProductData;
}
