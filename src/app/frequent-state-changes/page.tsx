"use client";

import { useState } from "react";
import { match } from "ts-pattern";
import {
  PriceList,
  PriceListWithMemoizedDebouncedPriceCards,
  PriceListWithMemoizedPriceCards,
  PriceListWithMemoizedThrottledPriceCards,
  PriceListWithThrottledPriceCards,
  VirtualizedPriceList,
  VirtualizedPriceListWithMemoizedPriceCards,
} from "./_components/PriceList";

const OPTIONS = {
  UNOPTIMIZED: "UNOPTIMIZED",
  MEMOIZED: "MEMOIZED",
  VIRTUALIZED: "VIRTUALIZED",
  VIRTUALIZED_MEMOIZED: "VIRTUALIZED_MEMOIZED",
  DEBOUNCED: "DEBOUNCED",
  MEMOIZED_DEBOUNCED: "MEMOIZED_DEBOUNCED",
  THROTTLED: "THROTTLED",
  MEMOIZED_THROTTLED: "MEMOIZED_THROTTLED",
} as const;
type Option = (typeof OPTIONS)[keyof typeof OPTIONS];
const labels: Record<Option, string> = {
  UNOPTIMIZED: "unoptimized",
  MEMOIZED: "React.memo",
  VIRTUALIZED: "Virtualized",
  VIRTUALIZED_MEMOIZED: "Virtualized + React.memo",
  DEBOUNCED: "Debounced",
  MEMOIZED_DEBOUNCED: "React.memo + Debounced",
  THROTTLED: "Throttled",
  MEMOIZED_THROTTLED: "React.memo + Throttled",
};

export default function FrequentStateChangesPage() {
  const [option, setOption] = useState<Option>("UNOPTIMIZED");

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Frequent State Changes</h1>
        <select
          className="border border-gray-300 rounded p-1"
          value={option}
          onChange={(e) => setOption(e.target.value as Option)}
        >
          {Object.entries(OPTIONS).map(([key, value]) => (
            <option key={key} value={value}>
              {labels[value]}
            </option>
          ))}
        </select>
      </div>
      {match(option)
        .with("UNOPTIMIZED", () => <PriceList />)
        .with("MEMOIZED", () => <PriceListWithMemoizedPriceCards />)
        .with("VIRTUALIZED", () => <VirtualizedPriceList />)
        .with("VIRTUALIZED_MEMOIZED", () => (
          <VirtualizedPriceListWithMemoizedPriceCards />
        ))
        .with("DEBOUNCED", () => <PriceListWithMemoizedPriceCards />)
        .with("MEMOIZED_DEBOUNCED", () => (
          <PriceListWithMemoizedDebouncedPriceCards />
        ))
        .with("THROTTLED", () => <PriceListWithThrottledPriceCards />)
        .with("MEMOIZED_THROTTLED", () => (
          <PriceListWithMemoizedThrottledPriceCards />
        ))
        .exhaustive()}
    </div>
  );
}
