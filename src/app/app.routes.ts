import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/role.guard';

/**
 * Application Routes
 * Defines all routes for the FixKar application
 */
export const routes: Routes = [
  // Public Home Page
  {
    path: '',
    loadComponent: () => import('./features/public/pages/home/home.component').then(m => m.HomeComponent),
    title: 'FixKar - Your Trusted Local Service Marketplace'
  },

  // Public Services Page
  {
    path: 'services',
    loadComponent: () => import('./features/public/pages/services/services.component').then(m => m.ServicesComponent),
    title: 'Find Services - FixKar'
  },

  // Public About Page
  {
    path: 'about',
    loadComponent: () => import('./features/public/pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us - FixKar'
  },

  // Public Contact Page
  {
    path: 'contact',
    loadComponent: () => import('./features/public/pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us - FixKar'
  },

  // Auth Routes (only accessible when NOT logged in)
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [noAuthGuard],
    title: 'Login - FixKar'
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent),
    canActivate: [noAuthGuard],
    title: 'Sign Up - FixKar'
  },

  // Customer Dashboard Routes (only accessible by customers)
  {
    path: 'customer',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/customer/pages/dashboard/dashboard.component').then(m => m.CustomerDashboardComponent),
        canActivate: [authGuard],
        title: 'Customer Dashboard - FixKar'
      },
      {
        path: 'bookings',
        loadComponent: () => import('./features/customer/pages/bookings/bookings.component').then(m => m.BookingsComponent),
        canActivate: [authGuard],
        title: 'My Bookings - FixKar'
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/customer/pages/profile/profile.component').then(m => m.CustomerProfileComponent),
        canActivate: [authGuard],
        title: 'My Profile - FixKar'
      }
    ]
  },

  // Service Provider Dashboard Routes (only accessible by providers)
  {
    path: 'provider',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/provider/pages/dashboard/dashboard.component').then(m => m.ProviderDashboardComponent),
        canActivate: [authGuard],
        title: 'Provider Dashboard - FixKar'
      },
      {
        path: 'services',
        loadComponent: () => import('./features/provider/pages/services/services.component').then(m => m.ProviderServicesComponent),
        canActivate: [authGuard],
        title: 'Manage Services - FixKar'
      },
      {
        path: 'bookings',
        loadComponent: () => import('./features/provider/pages/bookings/bookings.component').then(m => m.ProviderBookingsComponent),
        canActivate: [authGuard],
        title: 'Manage Bookings - FixKar'
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/provider/pages/profile/profile.component').then(m => m.ProviderProfileComponent),
        canActivate: [authGuard],
        title: 'Provider Profile - FixKar'
      }
    ]
  },

  // Fallback route for 404
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];