
# Cómo ejecutar la API/Backend?

Prerrequisitos
*Node.js 18+ instalado
*MongoDB Atlas o MongoDB local
*Git

1. Instalar dependencias  

   ```bash
   cd api
   npm install
   ```

2. Configurar variables de entorno  
   Crea un archivo .env en la carpeta api/ con:

   ```bash
   MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/mini-market?retryWrites=true&w=majority
   PORT=3001
   NODE_ENV=development
   ```

3. Poblar la base de datos  

   ```bash
   npm run seed
   ```

4. Ejecutar el servidor  

   ```bash
   npm run dev
   ```

Endpoints disponibles
Obtener todos los productos

GET <http://localhost:3001/api/products>
Parámetros opcionales:

?search=guantes - Buscar por nombre

?sort=price&order=asc - Ordenar por precio

?available=true - Solo productos en stock

?page=1&limit=10 - Paginación

Obtener un producto específico

GET <http://localhost:3001/api/products/p3>

## Cómo ejecutar el Frontend?

1.Instalar dependencias

```bash
cd web
npm install
```

2.Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: <http://localhost:3000>

## Cómo ejecutar el proyecto completo?

1.Instalar dependencias en la base del proyecto

```bash
cd mini-market
npm install
```

2.Ejecutar en modo desarrollo

```bash
npm run dev
```

Comentarios del desarrollador:

- Se anadio shadcn (popular libreria de componentes para React/Next) para darle estilo a los componentes de la app como un extra.
- La api y el frontend funcionan ambos independientemente.
- El algoritmo util se implemento en forma de boton en la barra de filtros como "ofertas" para mostrar los primeros 3 productos de la lista con menor precio. (tambien disponible en el dropdown que contiene los filtros solicitados) como otro extra.
- Se implemento base de datos no relacional MongoDB para almacenar los productos asi mismo como un seed para inicializar la base de datos.
- Para que valoren el MVP mindset, decidi omitir los tests unitarios ya que es un proyecto muy pequeno y no lo vi necesario. Pero en caso de
ser indispensable para proyectos reales, esten informados que cuento con las habilidades y conocimientos para hacerlo.
- Se siguio la estructura de carpetas sugerida.
- El tiempo total de desarrollo de este proyecto fue de 14 horas (activas) aproximadamente.
