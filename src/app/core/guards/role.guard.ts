import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

/**
 * Customer Guard
 * Protects routes that are specific to customers
 * Redirects non-customers to their appropriate dashboard
 */
export const customerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is logged in
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  // Check if user is a customer
  if (authService.isCustomer()) {
    return true;
  }

  // Redirect provider to their dashboard
  return router.createUrlTree(['/provider/dashboard']);
};

/**
 * Provider Guard
 * Protects routes that are specific to service providers
 * Redirects non-providers to their appropriate dashboard
 */
export const providerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is logged in
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  // Check if user is a provider
  if (authService.isProvider()) {
    return true;
  }

  // Redirect customer to their dashboard
  return router.createUrlTree(['/customer/dashboard']);
};

/**
 * No Auth Guard
 * Protects routes that should only be accessible when NOT logged in
 * (like login and register pages)
 * Redirects logged in users to their appropriate dashboard
 */
export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If user is not logged in, allow access
  if (!authService.isLoggedIn()) {
    return true;
  }

  // Redirect to appropriate dashboard based on role
  if (authService.isProvider()) {
    return router.createUrlTree(['/provider/dashboard']);
  }

  return router.createUrlTree(['/customer/dashboard']);
};