"use client";

import Loading from "Components/loading";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "src/firebase/clientApp";
import AccessDenied from "./AccessDenied";
import { useRouter } from "next/navigation";

type AdminGuardProps = {
  children?: React.ReactNode;
};

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, loadingAuth] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!loadingAuth) {
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        try {
          const userRef = doc(firestore, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists() && userDoc.data()?.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        } finally {
          setLoading(false);
        }
      }
    };
    checkAdminStatus();
  }, [user, loadingAuth]);

  if (loading || loadingAuth) {
    return <Loading />;
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};
export default AdminGuard;
