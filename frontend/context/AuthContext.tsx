import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI, UserStore, clearSession } from "../Service/api";

type Role = "DF" | "FINANCE" | "DME" | "SUPERVISOR" | "SUPER_USER";

interface User {
    id: string;
    full_name: string;
    email: string;
    role: Role;
}

interface LoginResult {
    success: boolean;
    user?: User;
    error?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<LoginResult>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    UserStore.get()
      .then((stored) => { if (stored) setUser(stored as User); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [])

  async function login(email: string, password: string): Promise<LoginResult> {
    try {
      const loggedInUser = await authAPI.login(email, password);
      setUser(loggedInUser as User);
      return { success: true, user: loggedInUser as User };
    } catch (err: any) {
      return { success: false, error: err.message || "Login failed" };
    }
  }

  function logout() {
    
    authAPI.logout().catch(() => {});
    clearSession();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}