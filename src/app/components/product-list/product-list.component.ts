import { Component, inject, OnInit, ViewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { toObservable } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatTooltipModule, DragDropModule, ScrollingModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class ProductListComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly placeholderImage = 'images/producto.png';
  private readonly failedImages = new Set<string>();

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  readonly products = this.productService.filteredProducts;
  readonly products$ = toObservable(this.productService.filteredProducts);
  readonly loading = this.productService.loading;
  readonly error = this.productService.error;
  readonly hasMore = this.productService.hasMore;

  /**
   * Chunk products into rows of 2 for the grid layout in virtual scroll
   */
  readonly productRows = computed(() => {
    const items = this.products();
    const rows: Product[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push(items.slice(i, i + 2));
    }
    return rows;
  });

  ngOnInit(): void {
    this.productService.loadProducts(true);
  }

  /**
   * Handle scroll event to load more products
   */
  onScroll(event: number): void {
    if (this.viewport) {
      const end = this.viewport.getRenderedRange().end;
      const total = this.viewport.getDataLength();
      
      // Load more when we reach the end of the current list
      if (end > 0 && end === total && this.hasMore() && !this.loading()) {
        this.productService.loadProducts();
      }
    }
  }

  /**
   * Handle drop event (when item is dragged back from cart)
   */
  drop(event: CdkDragDrop<any, any>): void {
    const previousId = event.previousContainer.id;
    const currentId = event.container.id;
    
    // If dropped from cart back to any product row
    if ((previousId === 'cart' || previousId === 'cart-btn') && currentId.startsWith('products-row-')) {
      const product = event.item.data as Product;
      this.cartService.remove(product.sku);
    }
  }

  /**
   * Track by row for virtual scroll optimization
   */
  trackByRow(index: number, row: Product[]): string {
    return `row-${index}-${row.map(p => p.sku).join('-')}`;
  }

  /**
   * Add product to cart (via button)
   */
  addToCart(product: Product): void {
    this.cartService.add(product);
  }
  /**
   * Get product image URL with fallback to placeholder
   */
  getProductImage(product: Product): string {
    if (!product.image) {
      return this.placeholderImage;
    }
    if (this.failedImages.has(product.sku)) {
      return this.placeholderImage;
    }
    return product.image;
  }

  /**
   * Handle image load error - fallback to placeholder
   */
  onImageError(product: Product): void {
    this.failedImages.add(product.sku);
  }
}
