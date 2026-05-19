/**
 * Service Model - Defines the structure of services offered by providers
 */
export interface Service {
  /** Unique service ID */
  id: string;
  
  /** Provider's UID who offers this service */
  providerId: string;
  
  /** Service title/name */
  title: string;
  
  /** Detailed description of the service */
  description: string;
  
  /** Category ID this service belongs to */
  categoryId: string;
  
  /** Category name (denormalized for easier queries) */
  categoryName: string;
  
  /** Subcategory if applicable */
  subcategory?: string;
  
  /** Service pricing */
  pricing: {
    /** Type of pricing: fixed, hourly, or range */
    type: 'fixed' | 'hourly' | 'range';
    /** Fixed price or hourly rate */
    amount?: number;
    /** Minimum price for range pricing */
    minPrice?: number;
    /** Maximum price for range pricing */
    maxPrice?: number;
    /** Currency code (e.g., PKR, USD) */
    currency: string;
  };
  
  /** Duration of the service in minutes */
  duration?: number;
  
  /** Service images */
  images: string[];
  
  /** Tags for searchability */
  tags: string[];
  
  /** Whether the service is active */
  isActive: boolean;
  
  /** Service rating */
  rating: number;
  
  /** Total reviews for this service */
  totalReviews: number;
  
  /** Total bookings for this service */
  totalBookings: number;
  
  /** Timestamps */
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Category Model - Defines service categories
 */
export interface Category {
  /** Unique category ID */
  id: string;
  
  /** Category name */
  name: string;
  
  /** Category description */
  description: string;
  
  /** Category icon (can be an icon name or URL) */
  icon: string;
  
  /** Category image URL */
  imageUrl?: string;
  
  /** Subcategories */
  subcategories: Subcategory[];
  
  /** Number of services in this category */
  serviceCount: number;
  
  /** Whether the category is active */
  isActive: boolean;
  
  /** Display order */
  order: number;
  
  /** Timestamps */
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Subcategory Model
 */
export interface Subcategory {
  /** Unique subcategory ID */
  id: string;
  
  /** Subcategory name */
  name: string;
  
  /** Subcategory description */
  description?: string;
}

/**
 * Service Search Filters
 */
export interface ServiceFilters {
  /** Search keyword */
  keyword?: string;
  
  /** Category ID */
  categoryId?: string;
  
  /** Subcategory ID */
  subcategoryId?: string;
  
  /** Minimum price */
  minPrice?: number;
  
  /** Maximum price */
  maxPrice?: number;
  
  /** Provider location/city */
  location?: string;
  
  /** Minimum rating */
  minRating?: number;
  
  /** Sort by */
  sortBy?: 'rating' | 'price_low' | 'price_high' | 'newest' | 'popular';
  
  /** Page number for pagination */
  page?: number;
  
  /** Items per page */
  limit?: number;
}

/**
 * Service Booking Model
 */
export interface Booking {
  /** Unique booking ID */
  id: string;
  
  /** Customer UID */
  customerId: string;
  
  /** Provider UID */
  providerId: string;
  
  /** Service ID */
  serviceId: string;
  
  /** Booking status */
  status: BookingStatus;
  
  /** Scheduled date and time */
  scheduledDate: Date;
  
  /** Booking duration in minutes */
  duration: number;
  
  /** Total price */
  totalPrice: number;
  
  /** Currency */
  currency: string;
  
  /** Customer notes */
  customerNotes?: string;
  
  /** Provider notes */
  providerNotes?: string;
  
  /** Service address */
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
  };
  
  /** Payment status */
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'cancelled';
  
  /** Payment method */
  paymentMethod?: string;
  
  /** Booking completion date */
  completedAt?: Date;
  
  /** Cancellation reason */
  cancellationReason?: string;
  
  /** Timestamps */
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Status Enum
 */
export enum BookingStatus {
  /** Booking is pending confirmation */
  Pending = 'pending',
  /** Booking is confirmed */
  Confirmed = 'confirmed',
  /** Service is in progress */
  InProgress = 'in_progress',
  /** Service is completed */
  Completed = 'completed',
  /** Booking is cancelled */
  Cancelled = 'cancelled',
  /** Booking is no-show */
  NoShow = 'no_show'
}

/**
 * Review Model
 */
export interface Review {
  /** Unique review ID */
  id: string;
  
  /** Booking ID this review is for */
  bookingId: string;
  
  /** Reviewer UID (customer) */
  reviewerId: string;
  
  /** Reviewee UID (provider) */
  revieweeId: string;
  
  /** Service ID */
  serviceId: string;
  
  /** Rating (1-5) */
  rating: number;
  
  /** Review comment */
  comment: string;
  
  /** Response from provider */
  providerResponse?: {
    comment: string;
    respondedAt: Date;
  };
  
  /** Timestamps */
  createdAt: Date;
  updatedAt: Date;
}