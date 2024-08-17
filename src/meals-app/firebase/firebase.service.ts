// src/firebase/firebase.service.ts
import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

@Injectable()
export class FirebaseService {
  private storage;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    this.storage = getStorage(app);
  }

  // Add methods to upload, download, and delete files from Firebase Storage here
  getStorage() {
    return this.storage;
  }
}
