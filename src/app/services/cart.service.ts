import { Injectable, signal, computed, Signal } from '@angular/core';
import { Product } from '../models/product.model';

/**
 * Design Pattern: Singleton - Single instance manages cart state across the application
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Private signal for cart items
  #items = signal<Product[]>([]);

  /**
   * Public readonly signal for cart items
   */
  readonly items: Signal<Product[]> = this.#items.asReadonly();

  /**
   * Computed signal for cart item count
   */
  readonly count = computed(() => this.#items().length);

  /**
   * Adds a product to the cart at the top if it doesn't already exist
   * @param product - Product to add
   */
  add(product: Product): void {
    if (!this.isInCart(product.sku)) {
      this.#items.update(items => [product, ...items]);
    }
  }

  /**
   * Removes a product from the cart by SKU
   * @param sku - Product SKU to remove
   */
  remove(sku: string): void {
    this.#items.update(items => items.filter(item => item.sku !== sku));
  }

  /**
   * Checks if a product is in the cart
   * @param sku - Product SKU to check
   * @returns true if product is in cart
   */
  isInCart(sku: string): boolean {
    return this.#items().some(item => item.sku === sku);
  }

  /**
   * Clears all items from the cart
   */
  clear(): void {
    this.#items.set([]);
  }

  /**
   * Resets cart to initial state
   */
  reset(): void {
    this.#items.set([]);
  }
}
