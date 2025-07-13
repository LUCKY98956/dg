import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let db: FirebaseFirestore.Firestore | null = null;

// Initialize Firebase Admin only if not already initialized
try {
  if (!getApps().length) {
    // Handle different private key formats
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) {
      // Remove quotes if present
      privateKey = privateKey.replace(/^"(.*)"$/, '$1');
      
      // Replace escaped newlines with actual newlines
      privateKey = privateKey.replace(/\\n/g, '\n');
      
      // Validate that we have a proper PEM key
      if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
        throw new Error('FIREBASE_PRIVATE_KEY must be a complete PEM formatted private key');
      }
    }
    
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
      throw new Error('Missing Firebase configuration');
    }
    
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
    
    db = getFirestore();
    console.log('Firebase initialized successfully');
  } else {
    db = getFirestore();
  }
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  console.log('Firebase will be disabled, falling back to in-memory storage');
  db = null;
}

export { db };