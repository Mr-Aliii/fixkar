import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';

/**
 * Root Application Component
 * Sets up the main layout with navbar, footer, and router outlet
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ToastContainerComponent
  ],
  template: `
    <!-- Toast Notifications Container -->
    <app-toast-container></app-toast-container>
    
    <!-- Main Navigation Bar -->
    <app-navbar></app-navbar>
    
    <!-- Main Content Area -->
    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>
    
    <!-- Footer -->
    <app-footer></app-footer>
  `
})
export class App {
  title = 'FixKar';
}