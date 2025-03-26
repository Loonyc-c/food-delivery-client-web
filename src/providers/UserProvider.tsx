"use client";

import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, createContext, useContext } from "react";

type DecodedToken = {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type UserContextType = {
  email: string | undefined;
  role: string | undefined;
};

const getDecodedToken = (token: string | null): DecodedToken | null => {
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsTokenLoaded(true);
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => getDecodedToken(token),
    enabled: isTokenLoaded,
  });

  console.log(user);

  if (isLoading) return <p>...Loading</p>;

  return (
    <>
      <UserContext.Provider value={{ email: user?.email, role: user?.role }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
