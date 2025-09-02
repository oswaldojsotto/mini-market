import { Product } from "@/shared/types";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">
          {product.name}
        </h3>
        <p className="text-gray-700 mb-2">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex justify-between items-center">
          <span
            className={`px-2 py-1 rounded text-xs ${
              product.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}>
            {product.isAvailable ? "En stock" : "Sin stock"}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
