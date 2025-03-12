import { Product } from "@/remotes/getProducts";
import { ComponentPropsWithRef, memo } from "react";

interface Props extends ComponentPropsWithRef<"div"> {
  product: Product;
}

export function ProductCard({ product, ...props }: Props) {
  return (
    <div className="border border-gray-300 rounded p-4 flex gap-4" {...props}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 rounded"
        loading="lazy"
      />
      <div>
        <h2 className="font-semibold">{product.name}</h2>
        <div className="flex gap-2">
          <p className="text-gray-500 line-through">
            {`$${product.price.toLocaleString()}`}
          </p>
          <p>{`$${product.discountPrice.toLocaleString()}`}</p>
        </div>
        <p className="text-gray-500 line-clamp-1">{product.description}</p>
      </div>
    </div>
  );
}

export const MemoizedProductCard = memo(ProductCard);
