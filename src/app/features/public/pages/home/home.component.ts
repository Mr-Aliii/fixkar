import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { Category, Service, ProviderProfile } from '../../../../core/models';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

/**
 * Home Component
 * Main landing page with hero section, categories, and top providers
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent],
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
      
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div class="absolute top-40 left-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-7xl font-bold mb-6">
          <span class="gradient-text">Find Trusted</span><br>
          <span class="text-gray-900">Local Services</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with verified service providers in Pakistan. From plumbing to electrical, 
          painting to cleaning - get quality services at your doorstep.
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto mb-12">
          <div class="glass-card p-2 flex flex-col sm:flex-row gap-2">
            <div class="flex-1 relative">
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input 
                type="text" 
                placeholder="What service do you need?" 
                class="w-full pl-12 pr-4 py-3 rounded-xl border-0 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button class="btn-primary whitespace-nowrap">
              Search Services
            </button>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold gradient-text">500+</div>
            <div class="text-gray-600 mt-1">Verified Providers</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold gradient-text">10k+</div>
            <div class="text-gray-600 mt-1">Services Completed</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold gradient-text">4.8</div>
            <div class="text-gray-600 mt-1">Average Rating</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Popular Categories</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Browse through our wide range of services and find exactly what you need
          </p>
        </div>

        @if (isLoading()) {
          <app-loading-spinner size="large" text="Loading categories..."></app-loading-spinner>
        } @else {
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            @for (category of categories(); track category.id) {
              <a 
                [routerLink]="['/services']" 
                [queryParams]="{category: category.id}"
                class="glass-card p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span class="text-3xl">{{ category.icon }}</span>
                </div>
                <h3 class="font-semibold text-lg mb-1">{{ category.name }}</h3>
                <p class="text-sm text-gray-500">{{ category.serviceCount }} services</p>
              </a>
            }
          </div>
        }
      </div>
    </section>

    <!-- Top Providers Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Top Rated Providers</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Work with the best professionals in your area
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (provider of topProviders(); track provider.uid) {
            <div class="glass-card p-6 hover:shadow-2xl transition-all duration-300">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-xl">
                  {{ provider.businessName.charAt(0) }}
                </div>
                <div class="ml-4">
                  <h3 class="font-semibold text-lg">{{ provider.businessName }}</h3>
                  <div class="flex items-center text-yellow-500">
                    <span class="text-sm font-medium mr-1">{{ provider.rating.toFixed(1) }}</span>
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="text-sm text-gray-500 ml-1">({{ provider.totalReviews }} reviews)</span>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ provider.bio }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                @for (category of provider.categories.slice(0, 3); track category) {
                  <span class="badge badge-primary">{{ category }}</span>
                }
              </div>
              <a [routerLink]="['/services']" class="btn-outline w-full text-center block">
                View Services
              </a>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h2 class="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-xl mb-8 opacity-90">
          Join thousands of satisfied customers and trusted service providers on FixKar
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a routerLink="/register" class="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all">
            Sign Up as Customer
          </a>
          <a routerLink="/register" [queryParams]="{role: 'provider'}" class="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all">
            Join as Provider
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `]
})
export class HomeComponent implements OnInit {
  private firestoreService = inject(FirestoreService);

  categories = signal<Category[]>([]);
  topProviders = signal<ProviderProfile[]>([]);
  isLoading = signal(true);

  async ngOnInit() {
    try {
      const [categories, providers] = await Promise.all([
        this.firestoreService.getCategories(),
        this.firestoreService.getTopProviders(6)
      ]);
      this.categories.set(categories);
      this.topProviders.set(providers);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}