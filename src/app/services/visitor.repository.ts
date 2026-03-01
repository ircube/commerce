import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Visitor } from '../models/visitor.model';
import { VisitorMapper } from '../mappers/visitor.mapper';
import { API_CONFIG } from '../config/api.config';

/**
 * Visitor Repository
 * Handles all data operations related to visitors/candidates
 * 
 * Design Pattern: Repository - Abstracts data layer from business logic
 * Provides a collection-like interface for accessing domain objects
 */
@Injectable({
  providedIn: 'root',
})
export class VisitorRepository {
  private readonly http = inject(HttpClient);
  private readonly mapper = inject(VisitorMapper);
  private readonly baseUrl = API_CONFIG.baseUrl;

  /**
   * Creates a new visitor session via POST request
   * @returns Observable of Visitor
   */
  getCurrent(): Observable<Visitor> {
    return this.http
      .post<{
        code: number;
        description: string;
        data: Record<string, unknown>;
      }>(`${this.baseUrl}${API_CONFIG.endpoints.visitors}`, {})
      .pipe(
        map(response => this.mapper.toDomain(response.data))
      );
  }
}
