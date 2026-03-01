import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductMapper } from '../mappers/product.mapper';
import { API_CONFIG } from '../config/api.config';

/**
 * Product Repository
 * Handles all data operations related to products
 * 
 * Design Pattern: Repository - Abstracts data layer from business logic
 * Provides a collection-like interface for accessing domain objects
 */
@Injectable({
  providedIn: 'root',
})
export class ProductRepository {
  private readonly http = inject(HttpClient);
  private readonly mapper = inject(ProductMapper);
  private readonly baseUrl = API_CONFIG.baseUrl;

  /**
   * Fetches products from the API with pagination
   * @param page - Page number (0-indexed)
   * @param size - Number of items per page
   * @returns Observable of Product array
   */
  getAll(page = 0, size = 10): Observable<Product[]> {
    return this.http
      .get<{
        code: number;
        description: string;
        data: { products: Record<string, unknown>[] };
      }>(`${this.baseUrl}${API_CONFIG.endpoints.products}`, {
        params: { page, size }
      })
      .pipe(map((response) => this.mapper.toDomainList(response.data.products)));
  }

  /**
   * Fetches a single product by SKU
   * @param sku - Product SKU identifier
   * @returns Observable of Product or undefined
   */
  getBySku(sku: string): Observable<Product | undefined> {
    return this.getAll().pipe(map((products) => products.find((p) => p.sku === sku)));
  }
}
