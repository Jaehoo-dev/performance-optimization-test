import { getPrices } from "@/remotes/getPrices";
import { useQuery } from "@tanstack/react-query";
import { REFETCH_INTERVAL } from "../_constants";

export function usePrices() {
  return useQuery({
    queryKey: ["prices"],
    queryFn: getPrices,
    refetchInterval: REFETCH_INTERVAL,
  });
}
