import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { Category, Service } from '../../../../core/models';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent],
  template: `
    <div class="min-h-screen pt-20 pb-12 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Welcome Section -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2">
            Welcome back, {{ authService.currentUser()?.firstName || 'User' }}!
          </h1>
          <p class="text-gray-600">Manage your bookings and explore services</p>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="glass-card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Total Bookings</p>
                <p class="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
          <div class="glass-card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Completed</p>
                <p class="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
          <div class="glass-card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Pending</p>
                <p class="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="glass-card p-6 mb-8">
          <h2 class="text-xl font-bold mb-4">Quick Actions</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a routerLink="/services" class="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
              <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <span class="text-sm font-medium">Browse Services</span>
            </a>
            <a routerLink="/customer/bookings" class="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
              <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <span class="text-sm font-medium">My Bookings</span>
            </a>
            <a routerLink="/customer/profile" class="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
              <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <span class="text-sm font-medium">My Profile</span>
            </a>
            <a routerLink="/contact" class="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
              <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <span class="text-sm font-medium">Support</span>
            </a>
          </div>
        </div>

        <!-- Popular Categories -->
        <div class="glass-card p-6">
          <h2 class="text-xl font-bold mb-4">Popular Categories</h2>
          @if (isLoading()) {
            <app-loading-spinner size="medium"></app-loading-spinner>
          } @else {
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              @for (category of categories(); track category.id) {
                <a routerLink="/services" [queryParams]="{category: category.id}" class="flex items-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                  <span class="text-2xl mr-3">{{ category.icon }}</span>
                  <span class="font-medium">{{ category.name }}</span>
                </a>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class CustomerDashboardComponent implements OnInit {
  authService = inject(AuthService);
  private firestoreService = inject(FirestoreService);

  categories = signal<Category[]>([]);
  isLoading = signal(true);

  async ngOnInit() {
    try {
      const categories = await this.firestoreService.getCategories();
      this.categories.set(categories);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}