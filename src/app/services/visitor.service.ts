import { Injectable, inject, signal, Signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Visitor } from '../models/visitor.model';
import { VisitorRepository } from '../services/visitor.repository';

/**
 * Visitor Service
 * Manages visitor/candidate state using Angular Signals
 * Consumes VisitorRepository to fetch data from API
 */
/**
 * Visitor Service
 * Manages visitor and application version information
 * 
 * Design Pattern: Singleton - Single instance manages application context
 */
@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private readonly repository = inject(VisitorRepository);

  // Signal for current visitor state
  #visitor = signal<Visitor | null>(null);

  // Signal for loading state
  #loading = signal<boolean>(false);

  // Signal for error state
  #error = signal<string | null>(null);

  /**
   * Public readonly signal for current visitor
   */
  readonly visitor: Signal<Visitor | null> = this.#visitor.asReadonly();

  /**
   * Public readonly signal for loading state
   */
  readonly loading: Signal<boolean> = this.#loading.asReadonly();

  /**
   * Public readonly signal for error state
   */
  readonly error: Signal<string | null> = this.#error.asReadonly();

  /**
   * Computed signal to check if visitor is loaded
   */
  readonly isLoaded = computed(() => this.#visitor() !== null);

  constructor() {
    takeUntilDestroyed();
  }

  /**
   * Loads visitor information from the API
   */
  loadVisitor(): void {
    this.#loading.set(true);
    this.#error.set(null);

    this.repository.getCurrent().subscribe({
      next: (visitor) => {
        this.#visitor.set(visitor);
        this.#loading.set(false);
      },
      error: (error) => {
        this.#error.set('Error loading visitor information');
        this.#loading.set(false);
        console.error('Error loading visitor:', error);
      }
    });
  }

  /**
   * Resets visitor state to initial values
   */
  reset(): void {
    this.#visitor.set(null);
    this.#loading.set(false);
    this.#error.set(null);
  }
}
