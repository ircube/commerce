import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, DragDropModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  private readonly cartService = inject(CartService);

  readonly cartItems = this.cartService.items;
  readonly total = this.cartService.total;
  readonly count = this.cartService.count;

  /**
   * Handle drop event (for reordering within cart or adding from products)
   */
  drop(event: CdkDragDrop<any, any>): void {
    // If dropped from products list, add to cart
    const previousId = event.previousContainer.id;
    const currentId = event.container.id;
    
    if (previousId !== currentId) {
      const product = event.item.data as Product;
      this.cartService.add(product);
    }
    // Reordering within cart can be implemented here if needed
  }

  /**
   * Remove item from cart
   */
  removeFromCart(sku: string): void {
    this.cartService.remove(sku);
  }

  /**
   * Decrement item quantity
   */
  decrementQuantity(sku: string): void {
    this.cartService.decrement(sku);
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    this.cartService.clear();
  }

  /**
   * Increment item quantity (exposed for template)
   */
  incrementQuantity(sku: string): void {
    const item = this.cartItems().find(i => i.sku === sku);
    if (item) {
      this.cartService.add(item);
    }
  }
}
