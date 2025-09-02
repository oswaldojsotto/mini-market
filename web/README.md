# Mini-Market

Una aplicación de mini marketplace construida con Next.js, Express.js y TypeScript.

## Estructura del proyecto

- `/api` - Servidor Express con TypeScript
- `/web` - Frontend Next.js con TypeScript
- `/shared` - Tipos y utilidades compartidas

## Características implementadas

- ✅ API con endpoints para listar y obtener detalles de productos
- ✅ Frontend con páginas para listado y detalle de productos
- ✅ Búsqueda, filtrado y ordenación de productos
- ✅ Paginación
- ✅ Algoritmo utilitario para obtener los productos más baratos disponibles
- ✅ Diseño responsive con Tailwind CSS

## Características pendientes (opcionales)

- ❌ Persistencia con MongoDB
- ❌ Tests unitarios
- ❌ Funcionalidad completa de favoritos

## Scripts disponibles

### Desarrollo
```bash
# Instalar dependencias
npm install
cd api && npm install
cd ../web && npm install

# Ejecutar en desarrollo (ambos servidores)
npm run dev