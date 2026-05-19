import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserRole } from '../../../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
          </div>
          <h1 class="text-3xl font-bold gradient-text mb-2">Create Account</h1>
          <p class="text-gray-600">Join FixKar today</p>
        </div>

        <!-- Account Type Tabs -->
        <div class="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button
            (click)="selectedRole = UserRole.Customer"
            [class.btn-primary]="selectedRole === UserRole.Customer"
            [class.text-gray-600]="selectedRole !== UserRole.Customer"
            class="flex-1 py-2 rounded-lg font-medium transition-all"
          >
            Customer
          </button>
          <button
            (click)="selectedRole = UserRole.Provider"
            [class.btn-primary]="selectedRole === UserRole.Provider"
            [class.text-gray-600]="selectedRole !== UserRole.Provider"
            class="flex-1 py-2 rounded-lg font-medium transition-all"
          >
            Service Provider
          </button>
        </div>

        <div class="glass-card p-8">
          <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
            @if (selectedRole === UserRole.Provider) {
              <div class="mb-5">
                <label class="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  [(ngModel)]="businessName"
                  required
                  class="input-field"
                  placeholder="Enter your business name"
                />
              </div>
            }

            <div class="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  [(ngModel)]="firstName"
                  required
                  class="input-field"
                  placeholder="First name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  [(ngModel)]="lastName"
                  required
                  class="input-field"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div class="mb-5">
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                [(ngModel)]="email"
                required
                email
                class="input-field"
                placeholder="Enter your email"
              />
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                [(ngModel)]="password"
                required
                minlength="6"
                class="input-field"
                placeholder="Create a password (min 6 characters)"
              />
            </div>

            @if (errorMessage) {
              <div class="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                {{ errorMessage }}
              </div>
            }

            <button
              type="submit"
              [disabled]="isLoading || registerForm.invalid"
              class="btn-primary w-full"
            >
              @if (isLoading) {
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              } @else {
                Create Account
              }
            </button>
          </form>
        </div>

        <p class="text-center mt-6 text-gray-600">
          Already have an account?
          <a routerLink="/login" class="text-primary-600 hover:text-primary-700 font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  authService = inject(AuthService);
  toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  UserRole = UserRole;
  selectedRole: UserRole = UserRole.Customer;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  businessName: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  ngOnInit() {
    const role = this.route.snapshot.queryParamMap.get('role');
    if (role === 'provider') {
      this.selectedRole = UserRole.Provider;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      if (this.selectedRole === UserRole.Provider) {
        await this.authService.registerProvider(
          this.email,
          this.password,
          this.firstName,
          this.lastName,
          this.businessName
        );
      } else {
        await this.authService.registerCustomer(
          this.email,
          this.password,
          this.firstName,
          this.lastName
        );
      }

      this.toastService.success('Account created successfully! Please check your email for verification.');
      
      if (this.selectedRole === UserRole.Provider) {
        this.router.navigate(['/provider/dashboard']);
      } else {
        this.router.navigate(['/customer/dashboard']);
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred during registration';
      this.toastService.error(this.errorMessage);
    } finally {
      this.isLoading = false;
    }
  }
}