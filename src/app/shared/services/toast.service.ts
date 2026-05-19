import { Injectable, signal, computed } from '@angular/core';

/**
 * Toast Message Interface
 */
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number; // in milliseconds
}

/**
 * Toast Service
 * Manages toast notifications throughout the application
 * Uses Angular Signals for reactive state management
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  
  /** Get all current toasts */
  toasts = computed(() => this.toastsSignal());

  /**
   * Show a success toast
   */
  success(message: string, duration: number = 4000): void {
    this.show('success', message, duration);
  }

  /**
   * Show an error toast
   */
  error(message: string, duration: number = 5000): void {
    this.show('error', message, duration);
  }

  /**
   * Show a warning toast
   */
  warning(message: string, duration: number = 4000): void {
    this.show('warning', message, duration);
  }

  /**
   * Show an info toast
   */
  info(message: string, duration: number = 4000): void {
    this.show('info', message, duration);
  }

  /**
   * Show a toast notification
   */
  private show(type: Toast['type'], message: string, duration: number = 4000): void {
    const id = this.generateId();
    const toast: Toast = { id, type, message, duration };
    
    // Add toast to the list
    this.toastsSignal.update(toasts => [...toasts, toast]);
    
    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  /**
   * Remove a toast by ID
   */
  remove(id: string): void {
    this.toastsSignal.update(toasts => 
      toasts.filter(t => t.id !== id)
    );
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    this.toastsSignal.set([]);
  }

  /**
   * Generate unique ID for toast
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}