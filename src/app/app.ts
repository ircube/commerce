import { Component, signal } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartPanelComponent } from './components/cart-panel/cart-panel.component';

@Component({
  selector: 'app-root',
  imports: [DragDropModule, HeaderComponent, WelcomeComponent, ProductListComponent, CartPanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('commerce');
}
