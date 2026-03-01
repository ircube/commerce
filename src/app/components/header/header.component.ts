import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { VisitorService } from '../../services/visitor.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly visitorService = inject(VisitorService);

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
