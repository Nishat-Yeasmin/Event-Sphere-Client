"use client";

import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "@/types/user";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  getCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          withCredentials: true,
        }
      );

      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

 useEffect(() => {
  const loadUser = async () => {
    await getCurrentUser();
  };

  loadUser();
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        getCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};