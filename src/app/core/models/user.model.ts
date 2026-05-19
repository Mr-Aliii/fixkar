/**
 * User Model - Defines the structure of user data in the application
 * This interface represents both customers and service providers
 */
export interface User {
  /** Unique Firebase UID */
  uid: string;
  
  /** User's email address */
  email: string;
  
  /** User's first name */
  firstName: string;
  
  /** User's last name */
  lastName: string;
  
  /** User's role - either 'customer' or 'provider' */
  role: UserRole;
  
  /** User's phone number (optional) */
  phone?: string;
  
  /** User's profile photo URL (optional) */
  photoURL?: string;
  
  /** Account creation timestamp */
  createdAt: Date;
  
  /** Last update timestamp */
  updatedAt: Date;
  
  /** Whether the user's email is verified */
  emailVerified: boolean;
  
  /** Whether the user account is active */
  isActive: boolean;
}

/**
 * User Roles - Defines the two types of users in the system
 */
export enum UserRole {
  /** Customer - Users who book services */
  Customer = 'customer',
  /** Service Provider - Users who offer services */
  Provider = 'provider'
}

/**
 * Service Provider Profile - Extended profile for service providers
 */
export interface ProviderProfile {
  /** Provider's UID (same as User uid) */
  uid: string;
  
  /** Business/Company name */
  businessName: string;
  
  /** Provider's bio/description */
  bio: string;
  
  /** Provider's address */
  address: {
    street?: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
  };
  
  /** Provider's location for geo-queries */
  location: {
    latitude: number;
    longitude: number;
  };
  
  /** Years of experience */
  experienceYears: number;
  
  /** Hourly rate or service charges */
  hourlyRate?: number;
  
  /** Provider's rating (calculated from reviews) */
  rating: number;
  
  /** Total number of reviews */
  totalReviews: number;
  
  /** Total number of completed jobs */
  totalJobs: number;
  
  /** Categories the provider works in */
  categories: string[];
  
  /** Provider's certifications or licenses */
  certifications?: string[];
  
  /** Provider's working hours */
  workingHours?: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  
  /** Whether the provider is currently available */
  isAvailable: boolean;
  
  /** Provider's social media links */
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  
  /** Profile completion percentage */
  profileCompletion: number;
  
  /** When the profile was last updated */
  lastUpdated: Date;
}