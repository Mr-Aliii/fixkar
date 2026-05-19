/**
 * Environment configuration for development
 * Replace these values with your actual Firebase configuration
 */
export const environment = {
  production: false,
  firebase: {
  apiKey: "AIzaSyBNDnoN5NEZoLHCYphP1XVmpMkfTh5VWsk",
  authDomain: "fixkar-65f19.firebaseapp.com",
  projectId: "fixkar-65f19",
  storageBucket: "fixkar-65f19.firebasestorage.app",
  messagingSenderId: "851203590226",
  appId: "1:851203590226:web:377feca3edda80df99b78b"
}
};

/* 
HOW TO GET YOUR FIREBASE CONFIG:
1. Go to Firebase Console (console.firebase.google.com)
2. Create a new project or select existing one
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Click on the web app icon (</>)
6. Copy the firebaseConfig object values above
7. Replace the placeholder values in this file

FOR PRODUCTION:
- Use environment.prod.ts file for production values
- Never commit sensitive keys to version control
- Use environment variables or Firebase App Check for production
*/