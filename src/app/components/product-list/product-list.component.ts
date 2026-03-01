import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { toObservable } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatTooltipModule, ScrollingModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly products = this.productService.products;
  readonly products$ = toObservable(this.productService.products);
  readonly loading = this.productService.loading;
  readonly error = this.productService.error;

  ngOnInit(): void {
    this.productService.loadProducts();
  }

  /**
   * Check if a product is in the cart
   */
  isInCart(sku: string): boolean {
    return this.cartService.isInCart(sku);
  }

  /**
   * Add product to cart
   */
  addToCart(product: Product): void {
    this.cartService.add(product);
  }
}
