"use client";
import {
  auth,
  listenToUserData,
  stopListeningToUserData,
} from "@/app/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type UserProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  createdAt?: number;
  updatedAt?: number;
};

type AuthContextType = {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  profileLoading: boolean;
  isOnline: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  profileLoading: true,
  isOnline: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Set initial state
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      // Reset profile when user changes
      if (!user) {
        setUserProfile(null);
        setProfileLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Real-time user profile listener
  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    if (user?.uid) {
      setProfileLoading(true);

      // Listen to real-time user data
      unsubscribeProfile = listenToUserData(user.uid, (data) => {
        if (data) {
          setUserProfile(data);
        } else {
          // If no profile data exists, create a default profile
          setUserProfile({
            firstName: "",
            lastName: "",
            email: user.email || "",
            phoneNumber: "",
            birthDate: "",
            gender: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
          });
        }
        setProfileLoading(false);
      });
    } else {
      setUserProfile(null);
      setProfileLoading(false);
    }

    return () => {
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
      if (user?.uid) {
        stopListeningToUserData(user.uid);
      }
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        profileLoading,
        isOnline,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
