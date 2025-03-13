import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteProducts } from "../_hooks/useInfiniteProducts";
import { MemoizedProductCard, ProductCard } from "./ProductCard";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { MAX_PAGES } from "../_constants";

export function ProductList() {
  const { ref, inView: bottomInView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteProducts();
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  useEffect(() => {
    if (bottomInView) {
      fetchNextPage();
    }
  }, [bottomInView, fetchNextPage]);

  return (
    <div className="flex flex-col gap-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div ref={ref} className="flex justify-center h-20 p-4">
        {isFetchingNextPage ? <LoadingSpinner /> : null}
      </div>
    </div>
  );
}

export function ProductListWithMemoizedProductCards() {
  const { ref, inView: bottomInView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteProducts();
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  useEffect(() => {
    if (bottomInView) {
      fetchNextPage();
    }
  }, [bottomInView, fetchNextPage]);

  return (
    <div className="flex flex-col gap-2">
      {products.map((product) => (
        <MemoizedProductCard key={product.id} product={product} />
      ))}
      <div ref={ref} className="flex justify-center h-20 p-4">
        {isFetchingNextPage ? <LoadingSpinner /> : null}
      </div>
    </div>
  );
}

export function VirtualizedProductList() {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteProducts();
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  const virtualizer = useWindowVirtualizer({
    count: products.length,
    estimateSize: () => 130,
    overscan: 5,
    gap: 8,
  });
  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const lastVirtualItem = virtualItems[virtualItems.length - 1];

    if (lastVirtualItem == null) {
      return;
    }

    if (lastVirtualItem.index === products.length - 1 && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage, products.length, virtualItems]);

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
          const product = products[virtualItem.index];

          return (
            <ProductCard
              key={product.id}
              product={product}
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
            />
          );
        })}
        <div className="flex justify-center h-20 p-4">
          {isFetchingNextPage ? <LoadingSpinner /> : null}
        </div>
      </div>
    </div>
  );
}

export function ProductListWithMaxPages() {
  const { ref: topRef, inView: topInView } = useInView();
  const { ref: bottomRef, inView: bottomInView } = useInView();
  const {
    data,
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasPreviousPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts({
    maxPages: MAX_PAGES,
  });
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  useEffect(() => {
    if (topInView && hasPreviousPage && !isFetchingPreviousPage) {
      const previousHeight = document.documentElement.scrollHeight;

      fetchPreviousPage().then(() => {
        const currentHeight = document.documentElement.scrollHeight;

        window.scrollBy({
          top: currentHeight - previousHeight,
          behavior: "instant",
        });
      });
    }
  }, [fetchPreviousPage, hasPreviousPage, isFetchingPreviousPage, topInView]);

  useEffect(() => {
    if (bottomInView) {
      fetchNextPage();
    }
  }, [bottomInView, fetchNextPage]);

  return (
    <div className="flex flex-col gap-2">
      {isFetchingPreviousPage ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : null}
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          ref={index === 0 ? topRef : null}
        />
      ))}
      <div ref={bottomRef} className="flex justify-center h-20 p-4">
        {isFetchingNextPage ? <LoadingSpinner /> : null}
      </div>
    </div>
  );
}
