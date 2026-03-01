import { Injectable, inject, signal, Signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '../models/product.model';
import { ProductRepository } from '../services/product.repository';

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
   * Public readonly signal for loading state
   */
  readonly loading: Signal<boolean> = this.#loading.asReadonly();

  /**
   * Public readonly signal for error state
   */
  readonly error: Signal<string | null> = this.#error.asReadonly();

  /**
   * Computed signal to check if products are loaded
   */
  readonly isLoaded = computed(() => this.#products().length > 0);

  constructor() {
    takeUntilDestroyed();
  }

  /**
   * Loads all products from the API
   */
  loadProducts(): void {
    this.#loading.set(true);
    this.#error.set(null);

    this.repository.getAll().subscribe({
      next: (products) => {
        this.#products.set(products);
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
    this.#loading.set(false);
    this.#error.set(null);
  }
}
