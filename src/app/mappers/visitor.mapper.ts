import { Injectable } from '@angular/core';
import { Visitor } from '../models/visitor.model';

/**
 * Data Mapper / Adapter Pattern Implementation
 * Transforms raw API response data into domain models
 * 
 * Design Pattern: Adapter - Converts API-specific structure to application domain models
 */
@Injectable({
  providedIn: 'root'
})
export class VisitorMapper {
  /**
   * Maps visitor data from API response to domain model
   * @param data - Raw visitor data from API
   * @returns Visitor domain model
   */
  toDomain(data: Record<string, unknown>): Visitor {
    return {
      name: String(data['welcome'] ?? data['name'] ?? 'Bienvenido Candidato 01'),
      version: String(data['version'] ?? '1.0.0'),
      image: data['image'] ? String(data['image']) : undefined
    };
  }
}
