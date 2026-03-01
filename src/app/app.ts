import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, WelcomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('commerce');
}
