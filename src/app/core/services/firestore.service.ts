import { Injectable, inject } from '@angular/core';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { Service, Category, ServiceFilters, ProviderProfile } from '../models';

/**
 * Firestore Service
 * Provides data access methods for Firestore collections
 * Handles CRUD operations for services, categories, and provider profiles
 */
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firebaseService = inject(FirebaseService);

  /**
   * Get Firestore instance
   */
  private getFirestore() {
    const firestore = this.firebaseService.getFirestore();
    if (!firestore) {
      throw new Error('Firestore not initialized');
    }
    return firestore;
  }

  // ==================== CATEGORIES ====================

  /**
   * Get all active categories
   */
  async getCategories(): Promise<Category[]> {
    const firestore = this.getFirestore();
    const categoriesRef = collection(firestore, 'categories');
    const q = query(
      categoriesRef, 
      where('isActive', '==', true),
      orderBy('order')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => this.convertToCategory(doc));
  }

  /**
   * Get a single category by ID
   */
  async getCategory(categoryId: string): Promise<Category | null> {
    const firestore = this.getFirestore();
    const categoryRef = doc(firestore, 'categories', categoryId);
    const categoryDoc = await getDoc(categoryRef);
    
    if (!categoryDoc.exists()) {
      return null;
    }
    
    return this.convertToCategory(categoryDoc);
  }

  // ==================== SERVICES ====================

  /**
   * Get services with filters and pagination
   */
  async getServices(filters: ServiceFilters = {}): Promise<{ services: Service[]; lastVisible: any }> {
    const firestore = this.getFirestore();
    const servicesRef = collection(firestore, 'services');
    
    let q = query(servicesRef, where('isActive', '==', true));
    
    // Apply filters
    if (filters.categoryId) {
      q = query(q, where('categoryId', '==', filters.categoryId));
    }
    
    if (filters.keyword) {
      // Note: Firestore doesn't support text search natively
      // For production, use Algolia or ElasticSearch
      // This is a basic implementation using tags
      q = query(q, where('tags', 'array-contains', filters.keyword.toLowerCase()));
    }
    
    // Apply sorting
    const sortBy = filters.sortBy || 'newest';
    switch (sortBy) {
      case 'rating':
        q = query(q, orderBy('rating', 'desc'));
        break;
      case 'price_low':
        q = query(q, orderBy('pricing.amount', 'asc'));
        break;
      case 'price_high':
        q = query(q, orderBy('pricing.amount', 'desc'));
        break;
      case 'popular':
        q = query(q, orderBy('totalBookings', 'desc'));
        break;
      case 'newest':
      default:
        q = query(q, orderBy('createdAt', 'desc'));
        break;
    }
    
    // Apply pagination
    const pageLimit = filters.limit || 12;
    q = query(q, limit(pageLimit));
    
    if (filters.page && filters.page > 1) {
      // For pagination, you need to store the last document
      // This is a simplified version
      const offset = (filters.page - 1) * pageLimit;
      // Note: Offset queries are not efficient in Firestore
      // For production, use cursor-based pagination
    }
    
    const snapshot = await getDocs(q);
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    
    return {
      services: snapshot.docs.map(doc => this.convertToService(doc)),
      lastVisible
    };
  }

  /**
   * Get services by provider ID
   */
  async getServicesByProvider(providerId: string): Promise<Service[]> {
    const firestore = this.getFirestore();
    const servicesRef = collection(firestore, 'services');
    const q = query(
      servicesRef, 
      where('providerId', '==', providerId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => this.convertToService(doc));
  }

  /**
   * Get a single service by ID
   */
  async getService(serviceId: string): Promise<Service | null> {
    const firestore = this.getFirestore();
    const serviceRef = doc(firestore, 'services', serviceId);
    const serviceDoc = await getDoc(serviceRef);
    
    if (!serviceDoc.exists()) {
      return null;
    }
    
    return this.convertToService(serviceDoc);
  }

  /**
   * Create a new service
   */
  async createService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const firestore = this.getFirestore();
    const servicesRef = collection(firestore, 'services');
    
    const serviceData = {
      ...service,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(servicesRef, serviceData);
    return docRef.id;
  }

  /**
   * Update a service
   */
  async updateService(serviceId: string, updates: Partial<Service>): Promise<void> {
    const firestore = this.getFirestore();
    const serviceRef = doc(firestore, 'services', serviceId);
    
    await updateDoc(serviceRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  }

  /**
   * Delete a service
   */
  async deleteService(serviceId: string): Promise<void> {
    const firestore = this.getFirestore();
    const serviceRef = doc(firestore, 'services', serviceId);
    await deleteDoc(serviceRef);
  }

  // ==================== PROVIDER PROFILES ====================

  /**
   * Get provider profile by UID
   */
  async getProviderProfile(uid: string): Promise<ProviderProfile | null> {
    const firestore = this.getFirestore();
    const profileRef = doc(firestore, 'providerProfiles', uid);
    const profileDoc = await getDoc(profileRef);
    
    if (!profileDoc.exists()) {
      return null;
    }
    
    return this.convertToProviderProfile(profileDoc);
  }

  /**
   * Update provider profile
   */
  async updateProviderProfile(uid: string, updates: Partial<ProviderProfile>): Promise<void> {
    const firestore = this.getFirestore();
    const profileRef = doc(firestore, 'providerProfiles', uid);
    
    await updateDoc(profileRef, {
      ...updates,
      lastUpdated: serverTimestamp()
    });
  }

  /**
   * Get top rated providers
   */
  async getTopProviders(limitCount: number = 6): Promise<ProviderProfile[]> {
    const firestore = this.getFirestore();
    const profilesRef = collection(firestore, 'providerProfiles');
    const q = query(
      profilesRef,
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => this.convertToProviderProfile(doc));
  }

  // ==================== HELPER METHODS ====================

  /**
   * Convert Firestore document to Category
   */
  private convertToCategory(doc: QueryDocumentSnapshot<DocumentData>): Category {
    const data = doc.data();
    return {
      id: doc.id,
      name: data['name'] || '',
      description: data['description'] || '',
      icon: data['icon'] || '',
      imageUrl: data['imageUrl'] || '',
      subcategories: data['subcategories'] || [],
      serviceCount: data['serviceCount'] || 0,
      isActive: data['isActive'] ?? true,
      order: data['order'] || 0,
      createdAt: (data['createdAt'] as Timestamp)?.toDate() || new Date(),
      updatedAt: (data['updatedAt'] as Timestamp)?.toDate() || new Date()
    };
  }

  /**
   * Convert Firestore document to Service
   */
  private convertToService(doc: QueryDocumentSnapshot<DocumentData>): Service {
    const data = doc.data();
    return {
      id: doc.id,
      providerId: data['providerId'] || '',
      title: data['title'] || '',
      description: data['description'] || '',
      categoryId: data['categoryId'] || '',
      categoryName: data['categoryName'] || '',
      subcategory: data['subcategory'] || '',
      pricing: {
        type: data['pricing']?.type || 'fixed',
        amount: data['pricing']?.amount,
        minPrice: data['pricing']?.minPrice,
        maxPrice: data['pricing']?.maxPrice,
        currency: data['pricing']?.currency || 'PKR'
      },
      duration: data['duration'],
      images: data['images'] || [],
      tags: data['tags'] || [],
      isActive: data['isActive'] ?? true,
      rating: data['rating'] || 0,
      totalReviews: data['totalReviews'] || 0,
      totalBookings: data['totalBookings'] || 0,
      createdAt: (data['createdAt'] as Timestamp)?.toDate() || new Date(),
      updatedAt: (data['updatedAt'] as Timestamp)?.toDate() || new Date()
    };
  }

  /**
   * Convert Firestore document to ProviderProfile
   */
  private convertToProviderProfile(doc: QueryDocumentSnapshot<DocumentData>): ProviderProfile {
    const data = doc.data();
    return {
      uid: data['uid'] || '',
      businessName: data['businessName'] || '',
      bio: data['bio'] || '',
      address: {
        street: data['address']?.street || '',
        city: data['address']?.city || '',
        state: data['address']?.state || '',
        country: data['address']?.country || 'Pakistan',
        postalCode: data['address']?.postalCode || ''
      },
      location: {
        latitude: data['location']?.latitude || 0,
        longitude: data['location']?.longitude || 0
      },
      experienceYears: data['experienceYears'] ?? 0,
      hourlyRate: data['hourlyRate'],
      rating: data['rating'] ?? 0,
      totalReviews: data['totalReviews'] || 0,
      totalJobs: data['totalJobs'] || 0,
      categories: data['categories'] || [],
      certifications: data['certifications'] || [],
      workingHours: data['workingHours'],
      isAvailable: data['isAvailable'] ?? false,
      socialLinks: data['socialLinks'],
      profileCompletion: data['profileCompletion'] || 0,
      lastUpdated: (data['lastUpdated'] as Timestamp)?.toDate() || new Date()
    };
  }
}