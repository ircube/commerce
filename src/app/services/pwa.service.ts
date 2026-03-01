import { Injectable, inject, signal, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PwaService implements OnDestroy {
  private readonly snackBar = inject(MatSnackBar);

  readonly isOnline = signal<boolean>(navigator.onLine);

  constructor() {
    this.initPwaFeatures();
  }

  private initPwaFeatures(): void {
    // Connection Status Monitoring (PWA Feature: Connection Status)
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  private updateOnlineStatus = (): void => {
    const status = navigator.onLine;
    this.isOnline.set(status);
    
    if (!status) {
      this.snackBar.open('You are offline. Some features may not work.', 'Close', { duration: 3000 });
    } else {
      this.snackBar.open('You are back online!', 'Dismiss', { duration: 2000 });
    }
  };

  ngOnDestroy(): void {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }
}
