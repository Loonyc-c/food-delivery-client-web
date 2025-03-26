"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type DecodedToken = {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload));

        const currentTime = Math.floor(Date.now() / 1000);
        const tokenExpired = decodedPayload.exp < currentTime;

        setDecodedToken(decodedPayload);
        setIsExpired(tokenExpired);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isExpired) {
      localStorage.removeItem("token");
    }

    if (!token) {
      if (pathname !== "/") {
        router.push("/");
      }
      return;
    }

    if (pathname === "/" && token) {
      router.push("/homePage");
    }

    if (pathname === "/signUp" && token) {
      router.push("/homePage");
    }
  }, [token, isExpired, pathname, router]);

  return <>{children}</>;
};

export default AuthProvider;
