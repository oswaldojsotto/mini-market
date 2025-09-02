"use client";

import { useState, useEffect } from "react";
import { Product, ProductFilters } from "@/shared/types";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({
    sort: "name",
    order: "asc",
    page: 1,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(filters);
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const available = formData.get("available") as string;

    setFilters(prev => ({
      ...prev,
      search: search || undefined,
      available: available
        ? available === "true"
        : undefined,
      page: 1,
    }));
  };

  const handleSortChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const [sort, order] = e.target.value.split("-");
    setFilters(prev => ({
      ...prev,
      sort: sort as "price" | "name",
      order: order as "asc" | "desc",
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  if (error)
    return (
      <div className="container mx-auto p-4 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      {/* Filtros y búsqueda */}
      <form
        onSubmit={handleSearch}
        className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            name="search"
            placeholder="Buscar productos..."
            className="border rounded px-3 py-2 flex-grow"
          />
          <select
            name="available"
            className="border rounded px-3 py-2"
            defaultValue="">
            <option value="">Todos</option>
            <option value="true">En stock</option>
            <option value="false">Sin stock</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Buscar
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label>Ordenar por:</label>
          <select
            onChange={handleSortChange}
            className="border rounded px-3 py-2"
            defaultValue="name-asc">
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="price-asc">
              Precio (Menor a Mayor)
            </option>
            <option value="price-desc">
              Precio (Mayor a Menor)
            </option>
          </select>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-8">
          Cargando productos...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">
          No se encontraron productos
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from(
                { length: totalPages },
                (_, i) => i + 1
              ).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${
                    filters.page === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}>
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
