import { Injectable, signal, computed, Signal } from '@angular/core';
import { CartItem, CartState } from '../models/cart.model';
import { Product } from '../models/product.model';

/**
 * Design Pattern: Singleton - Single instance manages cart state across the application
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Private signal for cart items
  #items = signal<CartItem[]>([]);

  /**
   * Public readonly signal for cart items
   */
  readonly items: Signal<CartItem[]> = this.#items.asReadonly();

  /**
   * Computed signal for cart total
   */
  readonly total = computed(() => 
    this.#items().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  /**
   * Computed signal for cart item count
   */
  readonly count = computed(() => 
    this.#items().reduce((sum, item) => sum + item.quantity, 0)
  );

  /**
   * Adds a product to the cart or increments quantity if already exists
   * @param product - Product to add
   */
  add(product: Product): void {
    const currentItems = this.#items();
    const existingIndex = currentItems.findIndex(item => item.sku === product.sku);

    if (existingIndex >= 0) {
      // Increment quantity if product already in cart
      const updatedItems = [...currentItems];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + 1
      };
      this.#items.set(updatedItems);
    } else {
      // Add new product with quantity 1
      this.#items.update(items => [...items, { ...product, quantity: 1 }]);
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
   * Decrements product quantity or removes if quantity reaches 0
   * @param sku - Product SKU to decrement
   */
  decrement(sku: string): void {
    const currentItems = this.#items();
    const existingItem = currentItems.find(item => item.sku === sku);

    if (existingItem) {
      if (existingItem.quantity === 1) {
        this.remove(sku);
      } else {
        this.#items.update(items =>
          items.map(item =>
            item.sku === sku ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    }
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
