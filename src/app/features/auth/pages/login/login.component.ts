import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserRole } from '../../../../core/models/user.model';

/**
 * Login Component
 * Handles user authentication with email and password
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <!-- Logo and Title -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
          </div>
          <h1 class="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p class="text-gray-600">Sign in to your FixKar account</p>
        </div>

        <!-- Login Form Card -->
        <div class="glass-card p-8">
          <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <!-- Email Input -->
            <div class="mb-5">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="email"
                required
                email
                #emailModel="ngModel"
                class="input-field"
                [class.input-field-error]="emailModel.invalid && emailModel.touched"
                placeholder="Enter your email"
              />
              @if (emailModel.invalid && emailModel.touched) {
                <p class="mt-1 text-sm text-red-600">
                  @if (emailModel.errors?.['required']) {
                    Email is required
                  } @else if (emailModel.errors?.['email']) {
                    Please enter a valid email
                  }
                </p>
              }
            </div>

            <!-- Password Input -->
            <div class="mb-5">
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div class="relative">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  id="password"
                  name="password"
                  [(ngModel)]="password"
                  required
                  minlength="6"
                  #passwordModel="ngModel"
                  class="input-field pr-10"
                  [class.input-field-error]="passwordModel.invalid && passwordModel.touched"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  (click)="togglePasswordVisibility()"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  @if (showPassword) {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  } @else {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  }
                </button>
              </div>
              @if (passwordModel.invalid && passwordModel.touched) {
                <p class="mt-1 text-sm text-red-600">
                  @if (passwordModel.errors?.['required']) {
                    Password is required
                  } @else if (passwordModel.errors?.['minlength']) {
                    Password must be at least 6 characters
                  }
                </p>
              }
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between mb-6">
              <label class="flex items-center">
                <input type="checkbox" class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500">
                <span class="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Forgot password?
              </a>
            </div>

            <!-- Error Message -->
            @if (errorMessage) {
              <div class="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                {{ errorMessage }}
              </div>
            }

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="isLoading || loginForm.invalid"
              class="btn-primary w-full flex items-center justify-center"
            >
              @if (isLoading) {
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              } @else {
                Sign In
              }
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white/80 text-gray-500">Or continue with</span>
            </div>
          </div>

          <!-- Social Login Buttons -->
          <div class="grid grid-cols-2 gap-4">
            <button class="flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button class="flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span class="text-sm font-medium text-gray-700">GitHub</span>
            </button>
          </div>
        </div>

        <!-- Sign Up Link -->
        <p class="text-center mt-6 text-gray-600">
          Don't have an account?
          <a routerLink="/register" class="text-primary-600 hover:text-primary-700 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  authService = inject(AuthService);
  toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle form submission
   */
  async onSubmit(): Promise<void> {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const user = await this.authService.login(this.email, this.password);
      
      this.toastService.success('Login successful! Welcome back!');
      
      // Redirect based on user role
      if (user.role === UserRole.Provider) {
        this.router.navigate(['/provider/dashboard']);
      } else {
        this.router.navigate(['/customer/dashboard']);
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred during login';
      this.toastService.error(this.errorMessage);
    } finally {
      this.isLoading = false;
    }
  }
}