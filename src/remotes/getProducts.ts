import { api } from "@/libs/httpClient";

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  description: string;
  image: string;
}

export async function getProducts(page: number) {
  const response = await api.get<{
    products: Product[];
    page: number;
  }>("/api/products", {
    params: {
      page,
    },
  });

  return response;
}
