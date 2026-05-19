import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen pt-20 pb-12 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2">
            Welcome, {{ authService.currentUser()?.firstName || 'Provider' }}!
          </h1>
          <p class="text-gray-600">Manage your services and bookings</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="glass-card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Total Services</p>
                <p class="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
          <div class="glass-card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Average Rating</p>
                <p class="text-2xl font-bold">0.0</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <a routerLink="/provider/services" class="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
            <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <span class="text-sm font-medium">Add Service</span>
          </a>
          <a routerLink="/provider/bookings" class="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
            <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="text-sm font-medium">View Bookings</span>
          </a>
          <a routerLink="/provider/profile" class="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
            <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <span class="text-sm font-medium">Edit Profile</span>
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
    </div>
  `
})
export class ProviderDashboardComponent {
  authService = inject(AuthService);
}