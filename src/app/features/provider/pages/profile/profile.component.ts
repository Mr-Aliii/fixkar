import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen pt-20 pb-12 px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Provider Profile</h1>
        <div class="glass-card p-8">
          <p class="text-gray-600">Profile management coming soon!</p>
        </div>
      </div>
    </div>
  `
})
export class ProviderProfileComponent {}