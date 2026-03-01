import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatBadgeModule, MatListModule, MatCardModule, DragDropModule],
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss']
})
export class CartPanelComponent {
  private readonly cartService = inject(CartService);
  private readonly placeholderImage = 'images/producto.png';
  private readonly failedImages = new Set<string>();

  readonly cartItems = this.cartService.items;
  readonly count = this.cartService.count;
  readonly isOpen = signal(false);

  /**
   * Toggle cart panel open/close
   */
  toggle(): void {
    this.isOpen.update(open => !open);
  }

  /**
   * Open cart panel
   */
  open(): void {
    this.isOpen.set(true);
  }

  /**
   * Close cart panel
   */
  close(): void {
    this.isOpen.set(false);
  }

  /**
   * Handle drop event
   */
  drop(event: CdkDragDrop<any, any>): void {
    const previousId = event.previousContainer.id;
    const currentId = event.container.id;
    
    // If dropped from any container (e.g., product rows) to cart or cart-btn
    if (previousId !== 'cart' && previousId !== 'cart-btn' && (currentId === 'cart' || currentId === 'cart-btn')) {
      const product = event.item.data as Product;
      this.cartService.add(product);
      this.open(); // Open panel when item is dropped
    }
  }

  /**
   * Remove item from cart
   */
  removeFromCart(sku: string): void {
    this.cartService.remove(sku);
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    this.cartService.clear();
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
