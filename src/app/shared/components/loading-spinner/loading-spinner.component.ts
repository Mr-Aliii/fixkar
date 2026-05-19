import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

/**
 * Loading Spinner Component
 * Displays a loading spinner with optional text
 * Used throughout the app to indicate loading states
 */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [NgIf],
  template: `
    <div 
      class="flex flex-col items-center justify-center"
      [class.p-fixed]="fullscreen"
      [class.inset-0]="fullscreen"
      [class.bg-white/80]="fullscreen"
      [class.z-50]="fullscreen"
      [class.p-8]="!fullscreen"
    >
      <!-- Spinner -->
      <div 
        class="animate-spin rounded-full border-4 border-primary-200"
        [class.w-12]="size === 'large'"
        [class.h-12]="size === 'large'"
        [class.w-8]="size === 'medium'"
        [class.h-8]="size === 'medium'"
        [class.w-5]="size === 'small'"
        [class.h-5]="size === 'small'"
        [class.border-t-primary-600]="true"
      ></div>
      
      <!-- Loading Text -->
      <p 
        *ngIf="text" 
        class="mt-4 text-gray-600 font-medium animate-pulse"
        [class.text-lg]="size === 'large'"
        [class.text-sm]="size !== 'large'"
      >
        {{ text }}
      </p>
    </div>
  `
})
export class LoadingSpinnerComponent {
  /** Spinner size: 'small', 'medium', or 'large' */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  /** Loading text to display below spinner */
  @Input() text: string = '';
  
  /** Whether to display as fullscreen overlay */
  @Input() fullscreen: boolean = false;
}