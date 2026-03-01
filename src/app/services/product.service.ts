import { Injectable, inject, signal, Signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '../models/product.model';
import { ProductRepository } from '../services/product.repository';
import { CartService } from './cart.service';

/**
 * Product Service
 * Manages product list state using Angular Signals
 * Consumes ProductRepository to fetch data from API
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly repository = inject(ProductRepository);
  private readonly cartService = inject(CartService);

  // Pagination state
  #currentPage = signal<number>(0);
  #pageSize = signal<number>(10);
  #hasMore = signal<boolean>(true);

  // Signal for products list
  #products = signal<Product[]>([]);

  // Signal for loading state
  #loading = signal<boolean>(false);

  // Signal for error state
  #error = signal<string | null>(null);

  /**
   * Public readonly signal for products list
   */
  readonly products: Signal<Product[]> = this.#products.asReadonly();

  /**
   * Computed signal for products NOT in cart
   */
  readonly filteredProducts = computed(() => {
    const cartSkus = new Set(this.cartService.items().map(item => item.sku));
    return this.#products().filter(product => !cartSkus.has(product.sku));
  });

  /**
   * Public readonly signal for loading state
   */
  readonly loading: Signal<boolean> = this.#loading.asReadonly();

  /**
   * Public readonly signal for error state
   */
  readonly error: Signal<string | null> = this.#error.asReadonly();

  /**
   * Public readonly signal for hasMore state
   */
  readonly hasMore: Signal<boolean> = this.#hasMore.asReadonly();

  /**
   * Computed signal to check if products are loaded
   */
  readonly isLoaded = computed(() => this.#products().length > 0);

  constructor() {
    takeUntilDestroyed();
  }

  /**
   * Loads products from the API with pagination
   * @param reset - If true, resets the product list and starts from page 0
   */
  loadProducts(reset = false): void {
    if (this.#loading() || (!this.#hasMore() && !reset)) {
      return;
    }

    if (reset) {
      this.#currentPage.set(0);
      this.#hasMore.set(true);
      this.#error.set(null);
    }

    this.#loading.set(true);

    this.repository.getAll(this.#currentPage(), this.#pageSize()).subscribe({
      next: (newProducts) => {
        if (reset) {
          this.#products.set(newProducts);
        } else {
          this.#products.update((current) => [...current, ...newProducts]);
        }

        // Check if we have more products to load
        // Note: For mock APIs, we might want to check if the newProducts length matches pageSize
        if (newProducts.length < this.#pageSize()) {
          this.#hasMore.set(false);
        } else {
          this.#currentPage.update((p) => p + 1);
        }

        this.#loading.set(false);
      },
      error: (error) => {
        this.#error.set('Error loading products');
        this.#loading.set(false);
        console.error('Error loading products:', error);
      }
    });
  }

  /**
   * Resets product state to initial values
   */
  reset(): void {
    this.#products.set([]);
    this.#currentPage.set(0);
    this.#hasMore.set(true);
    this.#loading.set(false);
    this.#error.set(null);
    this.loadProducts(true);
  }
}
