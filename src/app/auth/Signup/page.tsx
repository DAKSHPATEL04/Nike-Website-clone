// lib/firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
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
  Database,
  DatabaseReference,
  DataSnapshot,
} from "firebase/database";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  enableIndexedDbPersistence,
  initializeFirestore,
  Firestore,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
  databaseURL?: string;
}

interface UserData {
  [key: string]: any;
  updatedAt?: number; // Made optional
  createdAt?: number;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Services
const database: Database = getDatabase(app);
const auth: Auth = getAuth(app);

// Initialize Firestore with persistence
const db: Firestore = initializeFirestore(app, {
  cacheSizeBytes: firebaseConfig.databaseURL ? 1e9 : 0, // 1GB cache size
});

// Enable persistence with error handling
const enablePersistence = async (): Promise<void> => {
  try {
    await enableIndexedDbPersistence(db);
    console.log("Firestore persistence enabled");
  } catch (err: unknown) {
    if (err instanceof Error && "code" in err) {
      const error = err as { code: string };
      if (error.code === "failed-precondition") {
        console.warn("Firestore persistence failed - multiple tabs open");
      } else if (error.code === "unimplemented") {
        console.warn("Firestore persistence not available in this browser");
      } else {
        console.error("Firestore persistence error:", err);
      }
    } else {
      console.error("Unknown Firestore persistence error:", err);
    }
  }
};

if (typeof window !== "undefined") {
  enablePersistence();
}

// Realtime Database Utilities
const getUserRealtimeRef = (userId: string): DatabaseReference =>
  ref(database, `users/${userId}`);

const getUserRealtimeData = async (
  userId: string
): Promise<UserData | null> => {
  try {
    const snapshot: DataSnapshot = await get(getUserRealtimeRef(userId));
    return snapshot.exists()
      ? {
          ...snapshot.val(),
          updatedAt: snapshot.val().updatedAt || Date.now(),
        }
      : null;
  } catch (error) {
    console.error("Error getting user data from Realtime Database:", error);
    throw new Error("Failed to fetch user data");
  }
};

const setUserRealtimeData = async (
  userId: string,
  data: Partial<UserData>
): Promise<void> => {
  try {
    await set(getUserRealtimeRef(userId), {
      ...data,
      updatedAt: Date.now(),
      createdAt: data.createdAt || Date.now(),
    });
  } catch (error) {
    console.error("Error setting user data in Realtime Database:", error);
    throw new Error("Failed to set user data");
  }
};

const updateUserRealtimeData = async (
  userId: string,
  updates: Partial<UserData>
): Promise<void> => {
  try {
    await update(getUserRealtimeRef(userId), {
      ...updates,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Error updating user data in Realtime Database:", error);
    throw new Error("Failed to update user data");
  }
};

type UserDataCallback = (data: UserData | null) => void;

const listenToUserData = (
  userId: string,
  callback: UserDataCallback
): (() => void) => {
  const userRef = getUserRealtimeRef(userId);

  const unsubscribe = onValue(
    userRef,
    (snapshot) =>
      callback(
        snapshot.exists()
          ? {
              ...snapshot.val(),
              updatedAt: snapshot.val().updatedAt || Date.now(),
            }
          : null
      ),
    (error) => {
      console.error("Error listening to user data:", error);
      callback(null);
    }
  );

  return () => off(userRef, "value", unsubscribe);
};

const stopListeningToUserData = (userId: string): void => {
  off(getUserRealtimeRef(userId));
};

// Firestore Utilities
const getUserDocRef = (userId: string): DocumentReference<DocumentData> =>
  doc(db, "users", userId);

const getUserData = async (userId: string): Promise<DocumentData | null> => {
  try {
    const docSnap = await getDoc(getUserDocRef(userId));
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw new Error("Failed to get user document");
  }
};

const setUserData = async (
  userId: string,
  data: DocumentData
): Promise<void> => {
  try {
    await setDoc(getUserDocRef(userId), data, { merge: true });
  } catch (error) {
    console.error("Error setting user data:", error);
    throw new Error("Failed to set user document");
  }
};

const updateUserData = async (
  userId: string,
  updates: Partial<DocumentData>
): Promise<void> => {
  try {
    await updateDoc(getUserDocRef(userId), updates);
  } catch (error) {
    console.error("Error updating user data:", error);
    throw new Error("Failed to update user document");
  }
};

// Network Utilities
const enableOfflineMode = (): void => {
  goOffline(database);
  console.log("Firebase offline mode enabled");
};

const enableOnlineMode = (): void => {
  goOnline(database);
  console.log("Firebase online mode enabled");
};

// Export all Firebase services and utilities
export {
  app as firebaseApp,
  auth as firebaseAuth,
  database as firebaseDatabase,
  db as firestoreDb,
  getUserRealtimeData,
  setUserRealtimeData,
  updateUserRealtimeData,
  listenToUserData,
  stopListeningToUserData,
  getUserData,
  setUserData,
  updateUserData,
  enableOfflineMode,
  enableOnlineMode,
};

export type { UserData, UserDataCallback };
