import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';

/**
 * Navbar Component
 * Main navigation bar displayed across all pages
 * Responsive design with mobile hamburger menu
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-40 glass-card !rounded-none border-x-0 border-t-0 bg-white/90 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Logo -->
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2 group">
              <!-- Logo Icon -->
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span class="text-xl font-bold gradient-text hidden sm:block">FixKar</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6">
            <a routerLink="/" routerLinkActive="text-primary-600 font-semibold" class="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </a>
            <a routerLink="/services" routerLinkActive="text-primary-600 font-semibold" class="text-gray-700 hover:text-primary-600 transition-colors">
              Services
            </a>
            <a routerLink="/about" routerLinkActive="text-primary-600 font-semibold" class="text-gray-700 hover:text-primary-600 transition-colors">
              About
            </a>
            <a routerLink="/contact" routerLinkActive="text-primary-600 font-semibold" class="text-gray-700 hover:text-primary-600 transition-colors">
              Contact
            </a>
          </div>

          <!-- Auth Buttons / User Menu -->
          <div class="hidden md:flex items-center space-x-4">
            @if (!authService.isLoggedIn()) {
              <a routerLink="/login" class="btn-ghost">
                Login
              </a>
              <a routerLink="/register" class="btn-primary">
                Get Started
              </a>
            } @else {
              <!-- User Dropdown -->
              <div class="relative" (clickOutside)="closeUserMenu()">
                <button 
                  (click)="toggleUserMenu()"
                  class="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <!-- User Avatar -->
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold text-sm">
                    {{ getInitials() }}
                  </div>
                  <span class="text-gray-700 font-medium hidden lg:block">
                    {{ getUserDisplayName() }}
                  </span>
                  <!-- Dropdown Arrow -->
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                @if (isUserMenuOpen()) {
                  <div class="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-xl py-2 animate-slide-down">
                    <a 
                      [routerLink]="dashboardLink()" 
                      class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                      </svg>
                      Dashboard
                    </a>
                    <a 
                      routerLink="/profile" 
                      class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      Profile
                    </a>
                    <hr class="my-2">
                    <button 
                      (click)="logout()"
                      class="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Mobile Menu Button -->
          <button 
            (click)="toggleMobileMenu()"
            class="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            @if (!isMobileMenuOpen()) {
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            } @else {
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            }
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden glass-card !rounded-none border-x-0 border-b-0 mx-4 mt-2 mb-4 p-4 animate-slide-down">
          <div class="flex flex-col space-y-3">
            <a routerLink="/" (click)="closeMobileMenu()" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
              Home
            </a>
            <a routerLink="/services" (click)="closeMobileMenu()" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
              Services
            </a>
            <a routerLink="/about" (click)="closeMobileMenu()" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
              About
            </a>
            <a routerLink="/contact" (click)="closeMobileMenu()" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
              Contact
            </a>
            @if (!authService.isLoggedIn()) {
              <hr class="my-2">
              <a routerLink="/login" (click)="closeMobileMenu()" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                Login
              </a>
              <a routerLink="/register" (click)="closeMobileMenu()" class="btn-primary text-center">
                Get Started
              </a>
            } @else {
              <hr class="my-2">
              <a [routerLink]="dashboardLink()" (click)="closeMobileMenu()" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                Dashboard
              </a>
              <a routerLink="/profile" (click)="closeMobileMenu()" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                Profile
              </a>
              <button (click)="logout()" class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left">
                Logout
              </button>
            }
          </div>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  
  mobileMenuOpen = signal(false);
  userMenuOpen = signal(false);

  /**
   * Get user display name
   */
  getUserDisplayName(): string {
    const user = this.authService.currentUser();
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`;
  }

  /**
   * Get user initials for avatar
   */
  getInitials(): string {
    const user = this.authService.currentUser();
    if (!user) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }

  /**
   * Get dashboard link based on user role
   */
  dashboardLink(): string {
    const user = this.authService.currentUser();
    if (!user) return '/';
    return user.role === UserRole.Provider ? '/provider/dashboard' : '/customer/dashboard';
  }

  // Menu toggle methods
  isMobileMenuOpen() { return this.mobileMenuOpen(); }
  toggleMobileMenu() { this.mobileMenuOpen.update(v => !v); }
  closeMobileMenu() { this.mobileMenuOpen.set(false); }
  
  isUserMenuOpen() { return this.userMenuOpen(); }
  toggleUserMenu() { this.userMenuOpen.update(v => !v); }
  closeUserMenu() { this.userMenuOpen.set(false); }

  /**
   * Logout and redirect to home
   */
  async logout(): Promise<void> {
    await this.authService.logout();
    this.closeUserMenu();
    this.closeMobileMenu();
    this.router.navigate(['/']);
  }
}