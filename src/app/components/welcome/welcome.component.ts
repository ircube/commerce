import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VisitorService } from '../../services/visitor.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  private readonly visitorService = inject(VisitorService);

  readonly visitor = this.visitorService.visitor;
  readonly loading = this.visitorService.loading;
  readonly error = this.visitorService.error;

  ngOnInit(): void {
    this.visitorService.loadVisitor();
  }
}
