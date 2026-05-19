import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen pt-24 pb-12 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold mb-4 gradient-text">Contact Us</h1>
          <p class="text-xl text-gray-600">Get in touch with our support team</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Contact Form -->
          <div class="glass-card p-8">
            <h2 class="text-2xl font-bold mb-6">Send us a Message</h2>
            <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
              <div class="mb-5">
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  [(ngModel)]="form.name"
                  required
                  class="input-field"
                  placeholder="Enter your name"
                />
              </div>
              <div class="mb-5">
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  [(ngModel)]="form.email"
                  required
                  class="input-field"
                  placeholder="Enter your email"
                />
              </div>
              <div class="mb-5">
                <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select name="subject" [(ngModel)]="form.subject" required class="input-field">
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  [(ngModel)]="form.message"
                  required
                  rows="5"
                  class="input-field"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                [disabled]="isSubmitting || contactForm.invalid"
                class="btn-primary w-full"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="space-y-6">
            <div class="glass-card p-8">
              <h2 class="text-2xl font-bold mb-6">Contact Information</h2>
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10a7 7 0 0114 0"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg mb-1">Address</h3>
                    <p class="text-gray-600">Blue Area, Islamabad<br>Pakistan</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg mb-1">Email</h3>
                    <p class="text-gray-600">support&#64;fixkar.com</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg mb-1">Phone</h3>
                    <p class="text-gray-600">+92 300 1234567</p>
                    <p class="text-gray-600">Mon-Fri, 9am-6pm PKT</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="glass-card p-8">
              <h2 class="text-2xl font-bold mb-4">Follow Us</h2>
              <div class="flex space-x-4">
                <a href="#" class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center hover:bg-primary-200 transition-colors">
                  <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center hover:bg-primary-200 transition-colors">
                  <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
                  </svg>
                </a>
                <a href="#" class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center hover:bg-primary-200 transition-colors">
                  <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  private toastService = inject(ToastService);

  isSubmitting = false;
  form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  async onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    this.toastService.success('Message sent successfully! We will get back to you soon.');
    this.form = { name: '', email: '', subject: '', message: '' };
    this.isSubmitting = false;
  }
}