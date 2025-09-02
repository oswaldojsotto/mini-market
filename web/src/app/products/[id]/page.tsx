import { getProduct } from "@/lib/api";
import { Product } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  let product: Product | null = null;

  try {
    product = await getProduct(id);
  } catch (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">
          Producto no encontrado
        </div>
        <Link
          href="/products"
          className="text-blue-600 hover:underline mt-4 inline-block">
          Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/products"
        className="text-blue-600 hover:underline mb-4 inline-block">
        ← Volver a productos
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div className="relative h-96 bg-gray-200 rounded-lg">
          <div className="relative h-96 bg-gray-200 rounded-lg">
            <Image
              src={
                product.image || "/placeholder-image.jpg"
              }
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">
            {product.name}
          </h1>
          <p className="text-xl text-gray-800 mb-4">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex items-center mb-4">
            <span
              className={`px-3 py-1 rounded text-sm ${
                product.isAvailable
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}>
              {product.isAvailable
                ? "En stock"
                : "Sin stock"}
            </span>
            <span className="ml-4 text-sm text-gray-600 capitalize">
              Categoría: {product.category}
            </span>
          </div>

          <button
            disabled={!product.isAvailable}
            className={`px-6 py-3 rounded font-medium ${
              product.isAvailable
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}>
            {product.isAvailable
              ? "Agregar a favoritos"
              : "No disponible"}
          </button>
        </div>
      </div>
    </div>
  );
}
