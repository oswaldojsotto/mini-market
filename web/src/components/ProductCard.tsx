import { Product } from "@/shared/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({
  product,
  className,
}: ProductCardProps) {
  return (
    <Card
      className={`overflow-hidden  transition-all duration-300 hover:shadow-md border w-full   ${className}`}>
      <div className="relative h-48 w-48 mx-auto">
        <Image
          src={product.image || "/placeholder-image.jpg"}
          alt={product.name}
          width={200}
          height={200}
          className="object-cover"
        />
        <Badge
          className={`absolute top-2 right-2 text-xs ${
            product.isAvailable
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-500 hover:bg-gray-600 text-white"
          }`}>
          {product.isAvailable ? "En stock" : "Sin stock"}
        </Badge>
      </div>

      <CardContent className="p-3">
        <h3 className="font-semibold text-base mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary">
            ${product.price.toFixed(2)}
          </span>

          <Badge
            variant="outline"
            className="text-xs capitalize">
            {product.category}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full text-xs h-8">
          <Link href={`/products/${product.id}`}>
            Ver detalles
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
