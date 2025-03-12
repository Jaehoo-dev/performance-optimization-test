import { getProducts } from "@/remotes/getProducts";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Options {
  maxPages?: number;
  refetchInterval?: number;
}

export function useInfiniteProducts(options?: Options) {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getProducts(pageParam),
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }

      return firstPageParam - 1;
    },
    getNextPageParam: (lastPageParam) => lastPageParam.page + 1,
    initialPageParam: 0,
    ...options,
  });
}
