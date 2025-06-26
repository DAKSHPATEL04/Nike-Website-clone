// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistence settings
export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

// Enable persistence with error handling
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled in one tab at a time
    console.warn("Firestore persistence failed - multiple tabs open");
  } else if (err.code === "unimplemented") {
    // The current browser doesn't support all of the features required
    console.warn("Firestore persistence not available in this browser");
  }
});

export const auth = getAuth(app);

// Helper functions with improved typing
export const getUserDocRef = (userId: string) => doc(db, "users", userId);

export const getUserData = async (userId: string) => {
  try {
    const docRef = getUserDocRef(userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

export const setUserData = async (userId: string, data: any) => {
  try {
    const docRef = getUserDocRef(userId);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Error setting user data:", error);
    throw error;
  }
};

export const updateUserData = async (userId: string, updates: any) => {
  try {
    const docRef = getUserDocRef(userId);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
