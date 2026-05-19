import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen pt-20 pb-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Manage Services</h1>
        <div class="glass-card p-8 text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          <h2 class="text-xl font-semibold mb-2">No services yet</h2>
          <p class="text-gray-600 mb-4">Add your first service to start receiving bookings!</p>
          <button class="btn-primary">Add Service</button>
        </div>
      </div>
    </div>
  `
})
export class ProviderServicesComponent {}