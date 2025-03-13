"use client";

import { useState } from "react";
import {
  ProductList,
  ProductListWithMaxPages,
  ProductListWithMemoizedProductCards,
  VirtualizedProductList,
} from "./_components/ProductList";
import { match } from "ts-pattern";
import { MAX_PAGES } from "./_constants";
import { useQueryClient } from "@tanstack/react-query";
import { useInfiniteProducts } from "./_hooks/useInfiniteProducts";

const OPTIONS = {
  UNOPTIMIZED: "UNOPTIMIZED",
  MEMOIZED: "MEMOIZED",
  VIRTUAL_LIST: "VIRTUAL_LIST",
  MAX_PAGES: "MAX_PAGES",
} as const;
type Option = (typeof OPTIONS)[keyof typeof OPTIONS];
const labels: Record<Option, string> = {
  UNOPTIMIZED: "unoptimized",
  MEMOIZED: "React.memo",
  VIRTUAL_LIST: "virtual list",
  MAX_PAGES: `${MAX_PAGES} max pages`,
};

export default function ListPage() {
  const queryClient = useQueryClient();
  const [option, setOption] = useState<Option>("UNOPTIMIZED");

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          100 Items Per Page Infinite Scroll
        </h1>
        <select
          className="border border-gray-300 rounded p-1"
          value={option}
          onChange={(e) => {
            setOption(e.target.value as Option);
            queryClient.removeQueries({
              queryKey: useInfiniteProducts.queryKey,
            });
          }}
        >
          {Object.entries(OPTIONS).map(([key, value]) => (
            <option key={key} value={value}>
              {labels[value]}
            </option>
          ))}
        </select>
      </div>
      {match(option)
        .with("UNOPTIMIZED", () => <ProductList />)
        .with("MEMOIZED", () => <ProductListWithMemoizedProductCards />)
        .with("VIRTUAL_LIST", () => <VirtualizedProductList />)
        .with("MAX_PAGES", () => <ProductListWithMaxPages />)
        .exhaustive()}
    </div>
  );
}
