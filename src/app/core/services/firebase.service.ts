import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

/**
 * Firebase Service
 * Initializes Firebase and provides instances of Firebase services
 * This service ensures Firebase is only initialized once and only in browser context
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp | null = null;
  private auth: Auth | null = null;
  private firestore: Firestore | null = null;
  private storage: FirebaseStorage | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only initialize Firebase in browser context (not during SSR)
    if (isPlatformBrowser(this.platformId)) {
      this.initializeFirebase();
    }
  }

  /**
   * Initialize Firebase with configuration from environment
   */
  private initializeFirebase(): void {
    // Check if Firebase is already initialized
    if (this.app) {
      return;
    }

    try {
      // Check if Firebase config is valid
      if (!environment.firebase || !environment.firebase.apiKey) {
        console.warn('⚠️ Firebase configuration not found. Please add your Firebase config to environment.ts');
        console.warn('The app will run in demo mode with limited functionality.');
        return; // Don't throw, just skip initialization
      }

      // Initialize Firebase app
      this.app = initializeApp(environment.firebase);
      
      // Initialize Firebase services
      this.auth = getAuth(this.app);
      this.firestore = getFirestore(this.app);
      this.storage = getStorage(this.app);

      console.log('✅ Firebase initialized successfully');
    } catch (error) {
      console.error('❌ Firebase initialization error:', error);
      console.warn('⚠️ Running in demo mode. Please configure Firebase for full functionality.');
      // Don't throw - allow app to continue in demo mode
    }
  }

  /**
   * Get Firebase App instance
   */
  getApp(): FirebaseApp | null {
    return this.app;
  }

  /**
   * Get Firebase Auth instance
   */
  getAuth(): Auth | null {
    return this.auth;
  }

  /**
   * Get Firebase Firestore instance
   */
  getFirestore(): Firestore | null {
    return this.firestore;
  }

  /**
   * Get Firebase Storage instance
   */
  getStorage(): FirebaseStorage | null {
    return this.storage;
  }

  /**
   * Check if Firebase is initialized
   */
  isInitialized(): boolean {
    return this.app !== null;
  }
}