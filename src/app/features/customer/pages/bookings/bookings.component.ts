import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen pt-20 pb-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">My Bookings</h1>
        <div class="glass-card p-8 text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <h2 class="text-xl font-semibold mb-2">No bookings yet</h2>
          <p class="text-gray-600 mb-4">You haven't made any bookings yet. Browse services to get started!</p>
          <a href="/services" class="btn-primary">Browse Services</a>
        </div>
      </div>
    </div>
  `
})
export class BookingsComponent {}