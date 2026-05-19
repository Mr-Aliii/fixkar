import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { Category, Service } from '../../../../core/models';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  template: `
    <div class="min-h-screen pt-24 pb-12 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold mb-8">Find Services</h1>
        
        @if (isLoading()) {
          <app-loading-spinner size="large" text="Loading services..."></app-loading-spinner>
        } @else {
          <!-- Categories Filter -->
          <div class="mb-8 flex flex-wrap gap-3">
            @for (category of categories(); track category.id) {
              <button 
                (click)="filterByCategory(category.id)"
                [class.btn-primary]="selectedCategory() === category.id"
                [class.btn-outline]="selectedCategory() !== category.id"
                class="px-4 py-2 rounded-xl font-medium transition-all"
              >
                {{ category.name }}
              </button>
            }
          </div>

          <!-- Services Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (service of services(); track service.id) {
              <div class="glass-card p-6 hover:shadow-2xl transition-all cursor-pointer">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h3 class="font-semibold text-xl mb-1">{{ service.title }}</h3>
                    <p class="text-sm text-gray-500">{{ service.categoryName }}</p>
                  </div>
                  <div class="flex items-center text-yellow-500">
                    <span class="text-sm font-medium">{{ service.rating.toFixed(1) }}</span>
                    <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ service.description }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-semibold text-primary-600">
                    Rs. {{ service.pricing.amount || service.pricing.minPrice }}{{ service.pricing.type === 'hourly' ? '/hr' : '' }}
                  </span>
                  <button class="btn-primary text-sm px-4 py-2">Book Now</button>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class ServicesComponent implements OnInit {
  private firestoreService = inject(FirestoreService);
  private route = inject(ActivatedRoute);

  categories = signal<Category[]>([]);
  services = signal<Service[]>([]);
  selectedCategory = signal<string | null>(null);
  isLoading = signal(true);

  async ngOnInit() {
    const categoryId = this.route.snapshot.queryParamMap.get('category');
    if (categoryId) {
      this.selectedCategory.set(categoryId);
    }

    try {
      const [categories, servicesData] = await Promise.all([
        this.firestoreService.getCategories(),
        categoryId ? this.firestoreService.getServices({ categoryId }) : this.firestoreService.getServices()
      ]);
      this.categories.set(categories);
      this.services.set(servicesData.services);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async filterByCategory(categoryId: string) {
    this.selectedCategory.set(categoryId === this.selectedCategory() ? null : categoryId);
    this.isLoading.set(true);
    
    try {
      const filters = categoryId === this.selectedCategory() ? { categoryId } : {};
      const data = await this.firestoreService.getServices(filters);
      this.services.set(data.services);
    } catch (error) {
      console.error('Error filtering services:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}