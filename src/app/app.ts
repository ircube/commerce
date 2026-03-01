import { Component, signal } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProductListComponent } from './components/product-list/product-list.component';
<<<<<<< HEAD
import { CartPanelComponent } from './components/cart-panel/cart-panel.component';

@Component({
  selector: 'app-root',
  imports: [DragDropModule, HeaderComponent, WelcomeComponent, ProductListComponent, CartPanelComponent],
=======

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, WelcomeComponent, ProductListComponent],
>>>>>>> main
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('commerce');
}
