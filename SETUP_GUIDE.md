# FixKar - Complete Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A Firebase account (free tier is sufficient)

### Step 1: Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add project"
   - Enter project name: "FixKar" (or your preferred name)
   - Disable Google Analytics (optional)
   - Click "Create project"

2. **Enable Authentication**
   - In Firebase Console, go to **Authentication**
   - Click "Get started"
   - Enable **Email/Password** sign-in method
   - Click "Save"

3. **Create Firestore Database**
   - Go to **Firestore Database**
   - Click "Create database"
   - Start in **test mode** (we'll secure it later)
   - Choose a location close to your users (e.g., asia-south1 for Pakistan)

4. **Get Firebase Configuration**
   - Go to **Project Settings** (gear icon)
   - Scroll down to "Your apps" section
   - Click the web icon `</>`
   - Register app with nickname "FixKar Web"
   - Copy the `firebaseConfig` object

5. **Update Environment Files**
   ```bash
   # Open src/environments/environment.ts
   # Replace the placeholder values with your Firebase config:
   ```
   
   ```typescript
   export const environment = {
     production: false,
     firebase: {
       apiKey: 'YOUR_API_KEY',
       authDomain: 'YOUR_PROJECT.firebaseapp.com',
       projectId: 'YOUR_PROJECT_ID',
       storageBucket: 'YOUR_PROJECT.appspot.com',
       messagingSenderId: 'YOUR_SENDER_ID',
       appId: 'YOUR_APP_ID'
     }
   };
   ```

6. **Set up Firestore Security Rules**
   - In Firebase Console, go to **Firestore Database > Rules**
   - Replace with these rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read/write their own user document
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Provider profiles - providers can write their own, anyone can read
       match /providerProfiles/{providerId} {
         allow read: if true;
         allow write: if request.auth != null && request.auth.uid == providerId;
       }
       
       // Services - anyone can read, only authenticated providers can write their own
       match /services/{serviceId} {
         allow read: if true;
         allow create: if request.auth != null;
         allow update, delete: if request.auth != null && 
           resource.data.providerId == request.auth.uid;
       }
       
       // Categories - anyone can read, only admins can write
       match /categories/{categoryId} {
         allow read: if true;
         allow write: if false; // Manual admin only
       }
       
       // Bookings - involved users can read/write
       match /bookings/{bookingId} {
         allow read: if request.auth != null && 
           (resource.data.customerId == request.auth.uid || 
            resource.data.providerId == request.auth.uid);
         allow create: if request.auth != null;
         allow update: if request.auth != null && 
           (resource.data.customerId == request.auth.uid || 
            resource.data.providerId == request.auth.uid);
       }
     }
   }
   ```

### Step 2: Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   - App will be available at `http://localhost:4200`
   - Auto-reloads on file changes

3. **Create Sample Categories** (Optional)
   - Go to **Firestore Database** in Firebase Console
   - Click "Start collection"
   - Collection ID: `categories`
   - Add documents with these sample categories:

   ```json
   {
     "id": "plumbing",
     "name": "Plumbing",
     "description": "Pipe repairs, installations, and maintenance",
     "icon": "🔧",
     "subcategories": [
       {"id": "pipe-repair", "name": "Pipe Repair"},
       {"id": "drain-cleaning", "name": "Drain Cleaning"},
       {"id": "water-heater", "name": "Water Heater"}
     ],
     "serviceCount": 0,
     "isActive": true,
     "order": 1,
     "createdAt": "2024-01-01T00:00:00Z",
     "updatedAt": "2024-01-01T00:00:00Z"
   }
   ```

   Repeat for other categories: Electrical, Cleaning, Painting, AC Repair, Carpentry, etc.

### Step 3: Testing the Application

1. **Register as a Customer**
   - Go to `http://localhost:4200/register`
   - Select "Customer" tab
   - Fill in details and create account
   - You'll be redirected to customer dashboard

2. **Register as a Service Provider**
   - Go to `http://localhost:4200/register?role=provider`
   - Select "Service Provider" tab
   - Enter business name and personal details
   - You'll be redirected to provider dashboard

3. **Test Login/Logout**
   - Use the login page to sign in
   - Test the navbar user menu
   - Verify role-based redirects

### Step 4: Production Build

1. **Build for Production**
   ```bash
   npm run build -- --configuration=production
   ```
   - Output will be in `dist/` folder

2. **Update Production Environment**
   - Edit `src/environments/environment.prod.ts`
   - Use production Firebase config

### Step 5: Deploy to Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select "Use an existing project"
   - Choose your FixKar project
   - Public directory: `dist/fixkarapp/browser` (for Angular 21)
   - Configure as SPA: `Yes`
   - GitHub integration: `No` (optional)

4. **Build and Deploy**
   ```bash
   npm run build -- --configuration=production
   firebase deploy --only hosting
   ```

5. **Your app is live!**
   - URL: `https://your-project.web.app`

### Step 6: Firestore Indexes (Required for Queries)

Create these indexes in **Firestore > Indexes > Composite**:

1. **Services by Category**
   - Collection: `services`
   - Fields: `categoryId (Ascending)`, `createdAt (Descending)`

2. **Top Providers**
   - Collection: `providerProfiles`
   - Fields: `rating (Descending)`

3. **Services by Provider**
   - Collection: `services`
   - Fields: `providerId (Ascending)`, `createdAt (Descending)`

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # Route protection
│   │   ├── models/          # TypeScript interfaces
│   │   └── services/        # Firebase & business logic
│   ├── features/
│   │   ├── auth/            # Login & registration
│   │   ├── customer/        # Customer dashboard
│   │   ├── provider/        # Provider dashboard
│   │   └── public/          # Public pages
│   ├── shared/
│   │   ├── components/      # Reusable UI components
│   │   └── services/        # Shared services (toast, etc.)
│   ├── app.config.ts        # App configuration
│   ├── app.routes.ts        # Route definitions
│   └── app.ts               # Root component
├── environments/            # Environment configs
├── styles.css               # Global styles (Tailwind)
└── index.html               # Main HTML
```

## 🔧 Key Features Implemented

✅ **Authentication System**
- Email/Password registration & login
- Role-based access (Customer/Provider)
- Route guards for protected pages
- Persistent sessions

✅ **UI/UX**
- Modern glassmorphism design
- Fully responsive (mobile-first)
- Toast notifications
- Loading spinners
- Smooth animations

✅ **Firestore Integration**
- User profiles
- Service listings
- Provider profiles
- Category management

✅ **Dashboard Features**
- Customer dashboard with quick actions
- Provider dashboard with stats
- Role-based navigation

## 🚧 Features to Implement (Next Steps)

1. **Service Booking System**
   - Create booking requests
   - Booking status management
   - Calendar integration

2. **Payment Integration**
   - Stripe/JazzCash integration
   - Payment status tracking
   - Invoice generation

3. **Reviews & Ratings**
   - Service reviews
   - Provider ratings
   - Review moderation

4. **Real-time Chat**
   - Customer-provider messaging
   - Notification system

5. **Advanced Search**
   - Location-based filtering
   - Price range filters
   - Availability checking

## 🐛 Troubleshooting

### Firebase Initialization Error
- Ensure Firebase config is correct in environment files
- Check that Firebase services are enabled in console

### Build Errors
- Clear cache: `rm -rf .angular/cache dist`
- Reinstall: `npm ci`
- Check Node version: `node --version` (should be 18+)

### Firestore Permission Errors
- Verify security rules are correctly set
- Check that user is authenticated for protected operations

### Routing Issues
- Ensure all route guards are properly imported
- Check for circular dependencies in imports

## 📞 Support

For issues or questions:
- Firebase Console: [console.firebase.google.com](https://console.firebase.google.com)
- Angular Docs: [angular.io/docs](https://angular.io/docs)
- Firebase Docs: [firebase.google.com/docs](https://firebase.google.com/docs)

## 📄 License

This project is created for educational purposes. Feel free to use and modify for your own projects.

---

**Built with ❤️ using Angular 21, Firebase, and Tailwind CSS**