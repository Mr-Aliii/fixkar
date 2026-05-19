import { Injectable, signal, computed, inject } from '@angular/core';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  User as FirebaseUser,
  UserCredential
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { User, UserRole } from '../models/user.model';
import { environment } from '../../../environments/environment';

/**
 * Authentication Service
 * Handles all authentication operations including:
 * - User registration (customer and provider)
 * - User login/logout
 * - Password reset
 * - Email verification
 * - User profile management
 * 
 * Uses Angular Signals for reactive state management
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseService = inject(FirebaseService);
  
  // Signals for reactive state management
  private currentUserSignal = signal<User | null>(null);
  private isLoadingSignal = signal<boolean>(true);
  private errorSignal = signal<string | null>(null);

  // Computed signals
  isLoggedIn = computed(() => !!this.currentUserSignal());
  isLoading = computed(() => this.isLoadingSignal());
  currentUser = computed(() => this.currentUserSignal());
  error = computed(() => this.errorSignal());
  userRole = computed(() => this.currentUserSignal()?.role || null);
  isProvider = computed(() => this.currentUserSignal()?.role === UserRole.Provider);
  isCustomer = computed(() => this.currentUserSignal()?.role === UserRole.Customer);

  constructor() {
    this.initAuthListener();
  }

  /**
   * Initialize authentication state listener
   * This listens for auth state changes and updates the user signal
   */
  private initAuthListener(): void {
    const auth = this.firebaseService.getAuth();
    if (!auth) return;

    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userData = await this.getUserProfile(firebaseUser.uid);
        this.currentUserSignal.set(userData);
      } else {
        this.currentUserSignal.set(null);
      }
      this.isLoadingSignal.set(false);
    });
  }

  /**
   * Register a new customer account
   * @param email - User's email
   * @param password - User's password
   * @param firstName - User's first name
   * @param lastName - User's last name
   */
  async registerCustomer(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> {
    return this.registerUser(email, password, firstName, lastName, UserRole.Customer);
  }

  /**
   * Register a new service provider account
   * @param email - User's email
   * @param password - User's password
   * @param firstName - User's first name
   * @param lastName - User's last name
   * @param businessName - Provider's business name
   */
  async registerProvider(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    businessName: string
  ): Promise<User> {
    return this.registerUser(email, password, firstName, lastName, UserRole.Provider, businessName);
  }

  /**
   * Internal method to handle user registration
   */
  private async registerUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    businessName?: string
  ): Promise<User> {
    const auth = this.firebaseService.getAuth();
    const firestore = this.firebaseService.getFirestore();
    
    if (!auth || !firestore) {
      throw new Error('Firebase not initialized');
    }

    try {
      this.errorSignal.set(null);
      
      // Create user in Firebase Auth
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = userCredential.user;

      // Update Firebase Auth profile
      await updateProfile(firebaseUser, {
        displayName: `${firstName} ${lastName}`
      });

      // Create user document in Firestore
      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || email,
        firstName,
        lastName,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: false,
        isActive: true
      };

      await setDoc(doc(firestore, 'users', firebaseUser.uid), userData);

      // If provider, create provider profile
      if (role === UserRole.Provider && businessName) {
        await setDoc(doc(firestore, 'providerProfiles', firebaseUser.uid), {
          uid: firebaseUser.uid,
          businessName,
          bio: '',
          address: {
            city: '',
            state: '',
            country: 'Pakistan'
          },
          location: {
            latitude: 0,
            longitude: 0
          },
          experienceYears: 0,
          rating: 0,
          totalReviews: 0,
          totalJobs: 0,
          categories: [],
          isAvailable: false,
          profileCompletion: 20, // Basic profile created
          lastUpdated: new Date()
        });
      }

      // Send email verification
      await sendEmailVerification(firebaseUser);

      // Update local state
      this.currentUserSignal.set(userData);

      return userData;
    } catch (error: any) {
      this.errorSignal.set(error.message);
      throw error;
    }
  }

  /**
   * Sign in with email and password
   */
  async login(email: string, password: string): Promise<User> {
    const auth = this.firebaseService.getAuth();
    const firestore = this.firebaseService.getFirestore();
    
    if (!auth || !firestore) {
      throw new Error('Firebase not initialized');
    }

    try {
      this.errorSignal.set(null);
      
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Fetch user data from Firestore
      const userData = await this.getUserProfile(firebaseUser.uid);
      
      // Update local state
      this.currentUserSignal.set(userData);

      return userData;
    } catch (error: any) {
      this.errorSignal.set(error.message);
      throw error;
    }
  }

  /**
   * Sign out the current user
   */
  async logout(): Promise<void> {
    const auth = this.firebaseService.getAuth();
    
    if (!auth) {
      throw new Error('Firebase not initialized');
    }

    try {
      await signOut(auth);
      this.currentUserSignal.set(null);
      this.errorSignal.set(null);
    } catch (error: any) {
      this.errorSignal.set(error.message);
      throw error;
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<void> {
    const auth = this.firebaseService.getAuth();
    
    if (!auth) {
      throw new Error('Firebase not initialized');
    }

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      this.errorSignal.set(error.message);
      throw error;
    }
  }

  /**
   * Get user profile from Firestore
   */
  async getUserProfile(uid: string): Promise<User> {
    const firestore = this.firebaseService.getFirestore();
    
    if (!firestore) {
      throw new Error('Firebase not initialized');
    }

    try {
      const userDoc = await getDoc(doc(firestore, 'users', uid));
      
      if (!userDoc.exists()) {
        throw new Error('User profile not found');
      }

      const data = userDoc.data();
      
      // Convert Firestore timestamps to Date objects
      return {
        ...data,
        createdAt: (data['createdAt'] as Timestamp)?.toDate() || new Date(),
        updatedAt: (data['updatedAt'] as Timestamp)?.toDate() || new Date()
      } as User;
    } catch (error: any) {
      this.errorSignal.set(error.message);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<void> {
    const auth = this.firebaseService.getAuth();
    const firestore = this.firebaseService.getFirestore();
    const user = this.currentUserSignal();
    
    if (!auth || !firestore || !user) {
      throw new Error('User not authenticated');
    }

    try {
      // Update Firestore
      await updateDoc(doc(firestore, 'users', user.uid), {
        ...updates,
        updatedAt: serverTimestamp()
      });

      // Update Firebase Auth profile if name changed
      if (updates.firstName || updates.lastName) {
        await updateProfile(auth.currentUser!, {
          displayName: `${updates.firstName || user.firstName} ${updates.lastName || user.lastName}`
        });
      }

      // Update local state
      const updatedUser: User = { ...user, ...updates, updatedAt: new Date() };
      this.currentUserSignal.set(updatedUser);
    } catch (error: any) {
      this.errorSignal.set(error.message);
      throw error;
    }
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this.errorSignal.set(null);
  }
}