import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { usePrices } from "../_hooks/usePrices";
import {
  DebouncedPriceCard,
  MemoizedDebouncedPriceCard,
  MemoizedPriceCard,
  MemoizedThrottledPriceCard,
  PriceCard,
  ThrottledPriceCard,
} from "./PriceCard";

export function PriceList() {
  const { data } = usePrices();

  return (
    <div className="grid grid-cols-6 gap-4">
      {data?.map(({ id, price, change }) => (
        <PriceCard key={id} id={id} price={price} change={change} />
      ))}
    </div>
  );
}

export function PriceListWithMemoizedPriceCards() {
  const { data } = usePrices();

  return (
    <div className="grid grid-cols-6 gap-4">
      {data?.map(({ id, price, change }) => (
        <MemoizedPriceCard key={id} id={id} price={price} change={change} />
      ))}
    </div>
  );
}

export function VirtualizedPriceList() {
  const { data } = usePrices();
  const rowCount = data?.length != null ? Math.ceil(data.length / 6) : 0;

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 94,
    overscan: 12,
    gap: 16,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className="w-full">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualItem) => {
          const rowIndex = virtualItem.index;
          const startIndex = rowIndex * 6;

          return (
            <div
              key={rowIndex}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${
                  virtualItem.start - virtualizer.options.scrollMargin
                }px)`,
              }}
              className="grid grid-cols-6 gap-4"
            >
              {data
                ?.slice(startIndex, startIndex + 6)
                .map(({ id, price, change }) => (
                  <PriceCard key={id} id={id} price={price} change={change} />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function VirtualizedPriceListWithMemoizedPriceCards() {
  const { data } = usePrices();
  const rowCount = data?.length != null ? Math.ceil(data.length / 6) : 0;

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 94,
    overscan: 12,
    gap: 16,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className="w-full">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualItem) => {
          const rowIndex = virtualItem.index;
          const startIndex = rowIndex * 6;

          return (
            <div
              key={rowIndex}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${
                  virtualItem.start - virtualizer.options.scrollMargin
                }px)`,
              }}
              className="grid grid-cols-6 gap-4"
            >
              {data
                ?.slice(startIndex, startIndex + 6)
                .map(({ id, price, change }) => (
                  <MemoizedPriceCard
                    key={id}
                    id={id}
                    price={price}
                    change={change}
                  />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PriceListWithDebouncedPriceCards() {
  const { data } = usePrices();

  return (
    <div className="grid grid-cols-6 gap-4">
      {data?.map(({ id, price, change }) => (
        <DebouncedPriceCard key={id} id={id} price={price} change={change} />
      ))}
    </div>
  );
}

export function PriceListWithMemoizedDebouncedPriceCards() {
  const { data } = usePrices();

  return (
    <div className="grid grid-cols-6 gap-4">
      {data?.map(({ id, price, change }) => (
        <MemoizedDebouncedPriceCard
          key={id}
          id={id}
          price={price}
          change={change}
        />
      ))}
    </div>
  );
}

export function PriceListWithThrottledPriceCards() {
  const { data } = usePrices();

  return (
    <div className="grid grid-cols-6 gap-4">
      {data?.map(({ id, price, change }) => (
        <ThrottledPriceCard key={id} id={id} price={price} change={change} />
      ))}
    </div>
  );
}
export function PriceListWithMemoizedThrottledPriceCards() {
  const { data } = usePrices();

  return (
    <div className="grid grid-cols-6 gap-4">
      {data?.map(({ id, price, change }) => (
        <MemoizedThrottledPriceCard
          key={id}
          id={id}
          price={price}
          change={change}
        />
      ))}
    </div>
  );
}
