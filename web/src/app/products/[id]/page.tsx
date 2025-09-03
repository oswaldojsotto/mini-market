import { getProduct } from "@/lib/api";
import { Product } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart } from "lucide-react";

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
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="text-center p-8">
          <CardContent>
            <div className="text-6xl mb-4">😢</div>
            <h1 className="text-2xl font-bold mb-4">
              Producto no encontrado
            </h1>
            <Button asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a productos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Button
        asChild
        variant="ghost"
        className="mb-6"
        size="sm">
        <Link href="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a productos
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagen grande */}
        <Card className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={
                product.image || "/placeholder-image.jpg"
              }
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </Card>

        {/* Información del producto */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge
              className={
                product.isAvailable
                  ? "bg-green-500"
                  : "bg-gray-500"
              }>
              {product.isAvailable
                ? "En stock"
                : "Sin stock"}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {product.category}
            </Badge>
          </div>

          {/* Título - 20px */}
          <h1 className="text-xl font-bold">
            {product.name}
          </h1>

          {/* Precio - 18px */}
          <p className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>

          {/* Botones de acción */}
          <div className="space-y-3">
            <Button
              disabled={!product.isAvailable}
              className="w-full"
              size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Agregar a favoritos
            </Button>

            <Button
              variant="outline"
              className="w-full"
              size="lg">
              🛒 Agregar al carrito
            </Button>
          </div>

          {/* Información adicional */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">
                Descripción
              </h3>
              <p className="text-muted-foreground">
                Producto de alta calidad en la categoría{" "}
                {product.category}.
                {product.isAvailable
                  ? " Disponible para entrega inmediata."
                  : " Actualmente sin stock. Próximamente disponible."}
              </p>
            </CardContent>
          </Card>

          {/* Especificaciones */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">
                Especificaciones
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    ID del producto:
                  </span>
                  <span className="font-medium">
                    {product.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Categoría:
                  </span>
                  <span className="font-medium capitalize">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Disponibilidad:
                  </span>
                  <span
                    className={
                      product.isAvailable
                        ? "text-green-600 font-medium"
                        : "text-gray-600"
                    }>
                    {product.isAvailable
                      ? "Disponible"
                      : "Agotado"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
