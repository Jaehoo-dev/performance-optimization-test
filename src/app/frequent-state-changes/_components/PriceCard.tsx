import { Change } from "@/types";
import { useDebounce, useThrottle } from "@uidotdev/usehooks";
import { memo } from "react";
import { match } from "ts-pattern";
import { REFRESH_DELAY } from "../_constants";

export function PriceCard({
  id,
  price,
  change,
}: {
  id: number;
  price: number;
  change: Change;
}) {
  return (
    <div className="flex flex-col gap-1 p-4 border border-gray-300 rounded-md">
      <h2 className="text-lg">{`Item ${id}`}</h2>
      <div
        className={`text-xl font-semibold ${match(change)
          .with("UP", () => "text-blue-500")
          .with("DOWN", () => "text-red-500")
          .with("STABLE", () => "text-gray-500")
          .exhaustive()}`}
      >
        {`$${price.toLocaleString()}`}
      </div>
    </div>
  );
}

export const MemoizedPriceCard = memo(PriceCard);

export function ThrottledPriceCard({
  id,
  price,
  change,
}: {
  id: number;
  price: number;
  change: Change;
}) {
  const throttledPrice = useThrottle(price, REFRESH_DELAY);
  const throttledChange = useThrottle(change, REFRESH_DELAY);

  return (
    <div className="flex flex-col gap-1 p-4 border border-gray-300 rounded-md">
      <h2 className="text-lg">{`Item ${id}`}</h2>
      <div
        className={`text-xl font-semibold ${match(throttledChange)
          .with("UP", () => "text-blue-500")
          .with("DOWN", () => "text-red-500")
          .with("STABLE", () => "text-gray-500")
          .exhaustive()}`}
      >
        {`$${throttledPrice.toLocaleString()}`}
      </div>
    </div>
  );
}

export const MemoizedThrottledPriceCard = memo(ThrottledPriceCard);

export function DebouncedPriceCard({
  id,
  price,
  change,
}: {
  id: number;
  price: number;
  change: Change;
}) {
  const debouncedPrice = useDebounce(price, REFRESH_DELAY);
  const debouncedChange = useDebounce(change, REFRESH_DELAY);

  return (
    <div className="flex flex-col gap-1 p-4 border border-gray-300 rounded-md">
      <h2 className="text-lg">{`Item ${id}`}</h2>
      <div
        className={`text-xl font-semibold ${match(debouncedChange)
          .with("UP", () => "text-blue-500")
          .with("DOWN", () => "text-red-500")
          .with("STABLE", () => "text-gray-500")
          .exhaustive()}`}
      >
        {`$${debouncedPrice.toLocaleString()}`}
      </div>
    </div>
  );
}

export const MemoizedDebouncedPriceCard = memo(DebouncedPriceCard);
