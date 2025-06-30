// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  onValue,
  off,
  goOffline,
  goOnline,
} from "firebase/database";
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

// Initialize Realtime Database
export const database = getDatabase(app);

// Initialize Firestore (keeping for backward compatibility if needed)
export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

// Enable Firestore persistence with error handling
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.warn("Firestore persistence failed - multiple tabs open");
  } else if (err.code === "unimplemented") {
    console.warn("Firestore persistence not available in this browser");
  }
});

export const auth = getAuth(app);

// Realtime Database Helper Functions
export const getUserRealtimeRef = (userId: string) =>
  ref(database, `users/${userId}`);

export const getUserRealtimeData = async (userId: string) => {
  try {
    const userRef = getUserRealtimeRef(userId);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error("Error getting user data from Realtime Database:", error);
    throw error;
  }
};

export const setUserRealtimeData = async (userId: string, data: any) => {
  try {
    const userRef = getUserRealtimeRef(userId);
    await set(userRef, {
      ...data,
      updatedAt: Date.now(),
      createdAt: data.createdAt || Date.now(),
    });
  } catch (error) {
    console.error("Error setting user data in Realtime Database:", error);
    throw error;
  }
};

export const updateUserRealtimeData = async (userId: string, updates: any) => {
  try {
    const userRef = getUserRealtimeRef(userId);
    await update(userRef, {
      ...updates,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Error updating user data in Realtime Database:", error);
    throw error;
  }
};

// Real-time listener for user data
export const listenToUserData = (
  userId: string,
  callback: (data: any) => void
) => {
  const userRef = getUserRealtimeRef(userId);

  const unsubscribe = onValue(
    userRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error("Error listening to user data:", error);
      callback(null);
    }
  );

  return unsubscribe;
};

export const stopListeningToUserData = (userId: string) => {
  const userRef = getUserRealtimeRef(userId);
  off(userRef);
};

// Network status helpers
export const enableOfflineMode = () => {
  goOffline(database);
};

export const enableOnlineMode = () => {
  goOnline(database);
};

// Legacy Firestore functions (keeping for backward compatibility)
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
