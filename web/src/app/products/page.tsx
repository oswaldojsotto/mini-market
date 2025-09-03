"use client";

import { useState, useEffect, useCallback } from "react";
import { Product, ProductFilters } from "@/shared/types";
import ProductCard from "@/components/ProductCard";
import { ProductsFilter } from "@/components/ProductsFilter";
import { getProducts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTopCheapestAvailable } from "@/shared/utils";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<
    Product[]
  >([]);
  const [filters, setFilters] = useState<ProductFilters>({
    sort: "name",
    order: "asc",
    page: 1,
    limit: 12,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showTopCheapest, setShowTopCheapest] =
    useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts(filters);
        setProducts(data.products);
        setOriginalProducts(data.products);
        setTotalPages(data.totalPages);
        setShowTopCheapest(false);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [filters]);

  const handleSearchChange = useCallback(
    (search: string) => {
      setFilters(prev => ({
        ...prev,
        search: search.trim() || undefined,
        page: 1,
      }));
    },
    []
  );

  const handleSortChange = useCallback(
    (sort: string, order: string) => {
      setFilters(prev => ({
        ...prev,
        sort: sort as "price" | "name",
        order: order as "asc" | "desc",
        page: 1,
      }));
    },
    []
  );

  const handleAvailabilityChange = useCallback(
    (availability: string | undefined) => {
      setFilters(prev => ({
        ...prev,
        available: availability
          ? availability === "true"
          : undefined,
        page: 1,
      }));
    },
    []
  );

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleShowTopCheapest = useCallback(() => {
    if (showTopCheapest) {
      setProducts(originalProducts);
      setShowTopCheapest(false);
    } else {
      const cheapestProducts = getTopCheapestAvailable(
        originalProducts,
        3
      );
      setProducts(cheapestProducts);
      setShowTopCheapest(true);
    }
  }, [originalProducts, showTopCheapest]);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            Nuestros Productos
          </CardTitle>
          <CardDescription>
            Encuentra todo lo que necesitas para tu trabajo
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <ProductsFilter
            onSearchChange={handleSearchChange}
            sort={filters.sort || "name"}
            order={filters.order || "asc"}
            onSortChange={handleSortChange}
            availability={
              filters.available !== undefined
                ? filters.available.toString()
                : undefined
            }
            onAvailabilityChange={handleAvailabilityChange}
            onShowTopCheapest={handleShowTopCheapest}
            showTopCheapest={showTopCheapest}
          />
        </CardContent>
      </Card>

      {loading ? (
        <div className="grid grid-cols-1 min-[200px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : products.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-2xl font-semibold mb-2">
              No se encontraron productos
            </h2>
            <p className="text-muted-foreground">
              Intenta con otros filtros de búsqueda
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {showTopCheapest && (
            <Card className="mb-4 bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <p className="text-blue-800 font-medium">
                  Mostrando los 3 productos más baratos
                  disponibles
                </p>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-items-center">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                className="w-full sm:max-w-[250px]"
              />
            ))}
          </div>

          {totalPages > 1 && !showTopCheapest && (
            <div className="flex justify-center mt-8 space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page === 1}
                onClick={() =>
                  handlePageChange((filters.page ?? 1) - 1)
                }>
                Anterior
              </Button>

              {Array.from(
                { length: Math.min(5, totalPages) },
                (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={
                        filters.page === pageNum
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handlePageChange(pageNum)
                      }>
                      {pageNum}
                    </Button>
                  );
                }
              )}

              {totalPages > 5 && (
                <span className="px-2 py-1 text-muted-foreground">
                  ...
                </span>
              )}

              <Button
                variant="outline"
                size="sm"
                disabled={filters.page === totalPages}
                onClick={() =>
                  handlePageChange((filters.page ?? 1) + 1)
                }>
                Siguiente
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
