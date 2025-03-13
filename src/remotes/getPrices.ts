import { api } from "@/libs/httpClient";
import { Change } from "@/types";

export async function getPrices() {
  const response = await api.get<
    Array<{
      id: number;
      price: number;
      change: Change;
    }>
  >("/api/prices");

  return response;
}
