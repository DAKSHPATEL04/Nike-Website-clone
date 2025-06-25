"use client";

import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import Spiner from "../Spiner";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/Login");
    }
  }, [user, loading, router]);

  if (loading) return <Spiner />;
  return user ? children : null;
}
