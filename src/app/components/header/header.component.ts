import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { VisitorService } from '../../services/visitor.service';
import { PwaService } from '../../services/pwa.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, MatSnackBarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly visitorService = inject(VisitorService);
  private readonly pwaService = inject(PwaService);

  readonly isOnline = this.pwaService.isOnline;

  /**
   * Resets the entire application state
   * Fulfills [Peso 3] requirement for a reset button to restart the session
   */
  resetApplication(): void {
    this.cartService.reset();
    this.productService.reset();
    this.visitorService.reset();
    
    // Reload visitor to restart the "session"
    this.visitorService.loadVisitor();
  }
}
