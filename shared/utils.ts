import { Product } from './types';

export function getTopCheapestAvailable(products: Product[], top: number = 3): Product[] {
  const availableProducts = products.filter(product => product.isAvailable);
  
  availableProducts.sort((a, b) => a.price - b.price);
  
  return availableProducts.slice(0, top);
}