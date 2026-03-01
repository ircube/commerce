import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

/**
 * Data Mapper / Adapter Pattern Implementation
 * Transforms raw API response data into domain models
 * 
 * Design Pattern: Adapter - Converts API-specific structure to application domain models
 */
@Injectable({
  providedIn: 'root'
})
export class ProductMapper {
  /**
   * Maps a single product from API response to domain model
   * @param data - Raw product data from API
   * @returns Product domain model
   */
  toDomain(data: Record<string, unknown>): Product {
    const rawImage = String(data['image'] ?? '');
    // Redirect all image paths to the products/ folder
    // Remove leading slash if present to avoid double slashes when prefixing
    const imagePath = rawImage ? `products/${rawImage.startsWith('/') ? rawImage.substring(1) : rawImage}` : '';

    return {
      type: String(data['type'] ?? 'Product'),
      sku: String(data['sku'] ?? ''),
      name: String(data['name'] ?? ''),
      image: imagePath,
      description: String(data['description'] ?? ''),
      price: Number(data['price'] ?? 0)
    };
  }

  /**
   * Maps an array of products from API response to domain models
   * @param productsData - Array of raw product data from API
   * @returns Array of Product domain models
   */
  toDomainList(productsData: Record<string, unknown>[]): Product[] {
    return productsData.map(product => this.toDomain(product));
  }
}
