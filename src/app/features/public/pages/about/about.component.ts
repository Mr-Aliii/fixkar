import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen pt-24 pb-12 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold mb-4 gradient-text">About FixKar</h1>
          <p class="text-xl text-gray-600">Your trusted local service marketplace in Pakistan</p>
        </div>

        <div class="glass-card p-8 mb-8">
          <h2 class="text-2xl font-bold mb-4">Our Mission</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            FixKar was founded with a simple mission: to connect homeowners and businesses with 
            verified, professional service providers across Pakistan. We believe that finding 
            reliable services shouldn't be a hassle.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Whether you need plumbing repairs, electrical work, painting, cleaning, or any other 
            home service, FixKar makes it easy to find, book, and pay for quality services right 
            at your doorstep.
          </p>
        </div>

        <div class="glass-card p-8 mb-8">
          <h2 class="text-2xl font-bold mb-6">Why Choose Us</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-1">Verified Providers</h3>
                <p class="text-gray-600">All our service providers are thoroughly verified and background-checked.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-1">Transparent Pricing</h3>
                <p class="text-gray-600">Clear, upfront pricing with no hidden charges or surprises.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-1">Quick Booking</h3>
                <p class="text-gray-600">Book services in minutes with our easy-to-use platform.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-1">Satisfaction Guaranteed</h3>
                <p class="text-gray-600">Not happy? We'll make it right or your money back.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-card p-8">
          <h2 class="text-2xl font-bold mb-4">Our Story</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Founded in 2024, FixKar started as a solution to a common problem: finding reliable 
            service providers in Pakistan is often frustrating and time-consuming. We set out to 
            change that by creating a platform that brings together the best local professionals 
            and makes booking their services as simple as a few clicks.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Today, we serve thousands of satisfied customers across major cities in Pakistan, 
            connecting them with skilled professionals for all their home and business service needs.
          </p>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}