"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useJwt } from "react-jwt";

type DecodedToken = {
  role: string;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  //   const { isExpired } = useJwt<DecodedToken>(token || "");

  useEffect(() => {
    const checkTokenAndRoute = () => {
      if (!token) {
        router.push("/auth/sign-in");
      }

      if (pathname === "/") {
        router.push("/");
      }
    };

    checkTokenAndRoute();
  }, [token]);

  return <>{children}</>;
};

export default AuthProvider;
