"use client";

import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Filter,
  SortAsc,
  SortDesc,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductsFilterProps {
  onSearchChange: (search: string) => void;
  sort: string;
  order: string;
  onSortChange: (sort: string, order: string) => void;
  availability: string | undefined;
  onAvailabilityChange: (
    availability: string | undefined
  ) => void;
  className?: string;
}

export function ProductsFilter({
  onSearchChange,
  sort,
  order,
  onSortChange,
  availability,
  onAvailabilityChange,
  className,
}: ProductsFilterProps) {
  const [localSearch, setLocalSearch] = useState("");
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const [isFilterActive, setIsFilterActive] =
    useState(false);

  useEffect(() => {
    const hasActiveFilters =
      localSearch.trim() !== "" ||
      sort !== "name" ||
      order !== "asc" ||
      availability !== undefined;

    setIsFilterActive(hasActiveFilters);
  }, [localSearch, sort, order, availability]);

  const clearSearch = useCallback(() => {
    setLocalSearch("");
  }, []);

  const clearAllFilters = useCallback(() => {
    setLocalSearch("");
    onSortChange("name", "asc");
    onAvailabilityChange(undefined);
  }, [onSortChange, onAvailabilityChange]);

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-4 items-end",
        className
      )}>
      {/* Barra de búsqueda */}
      <div className="w-full flex-1">
        <Label htmlFor="search" className="sr-only">
          Buscar productos
        </Label>
        <div className="relative">
          {/* Icono de búsqueda */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />

          {/* Input con placeholder responsive */}
          <Input
            id="search"
            type="text"
            placeholder="Buscar..."
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            className="pl-10 pr-10 w-full text-sm sm:text-base"
            // Mejoras de accesibilidad
            aria-describedby="search-help"
          />

          {/* Botón clear con mejor UX */}
          {localSearch && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-accent"
              aria-label="Limpiar búsqueda">
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          )}
        </div>

        {/* Texto de ayuda opcional */}
        <p
          id="search-help"
          className="text-xs text-muted-foreground mt-1 sr-only">
          Escribe para buscar productos. Los resultados se
          actualizarán automáticamente.
        </p>
      </div>

      {/* Dropdown de filtros - COMPLETO */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={
                isFilterActive ? "secondary" : "outline"
              }
              size="sm"
              className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {isFilterActive && (
                <span className="h-2 w-2 bg-primary rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              Opciones de Filtrado
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Ordenar por
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => onSortChange("name", "asc")}
              className={cn(
                "flex items-center gap-2",
                sort === "name" &&
                  order === "asc" &&
                  "bg-accent"
              )}>
              <SortAsc className="h-4 w-4" />
              Nombre (A-Z)
              {sort === "name" && order === "asc" && (
                <span className="ml-auto h-2 w-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onSortChange("name", "desc")}
              className={cn(
                "flex items-center gap-2",
                sort === "name" &&
                  order === "desc" &&
                  "bg-accent"
              )}>
              <SortDesc className="h-4 w-4" />
              Nombre (Z-A)
              {sort === "name" && order === "desc" && (
                <span className="ml-auto h-2 w-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onSortChange("price", "asc")}
              className={cn(
                "flex items-center gap-2",
                sort === "price" &&
                  order === "asc" &&
                  "bg-accent"
              )}>
              <SortAsc className="h-4 w-4" />
              Precio (Menor a Mayor)
              {sort === "price" && order === "asc" && (
                <span className="ml-auto h-2 w-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onSortChange("price", "desc")}
              className={cn(
                "flex items-center gap-2",
                sort === "price" &&
                  order === "desc" &&
                  "bg-accent"
              )}>
              <SortDesc className="h-4 w-4" />
              Precio (Mayor a Menor)
              {sort === "price" && order === "desc" && (
                <span className="ml-auto h-2 w-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Disponibilidad
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() =>
                onAvailabilityChange(undefined)
              }
              className={cn(
                availability === undefined && "bg-accent"
              )}>
              Todos los productos
              {availability === undefined && (
                <span className="ml-auto h-2 w-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onAvailabilityChange("true")}
              className={cn(
                availability === "true" && "bg-accent"
              )}>
              Solo en stock
              {availability === "true" && (
                <span className="ml-auto h-2 w-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onAvailabilityChange("false")}
              className={cn(
                availability === "false" && "bg-accent"
              )}>
              Sin stock
              {availability === "false" && (
                <span className="ml-auto h-2 w-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>

            {isFilterActive && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={clearAllFilters}
                  className="text-destructive focus:text-destructive">
                  <X className="h-4 w-4 mr-2" />
                  Limpiar todos los filtros
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Botón para limpiar filtros (visible en mobile) */}
        {isFilterActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="sm:hidden">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
