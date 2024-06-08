"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, registerUser } from "../api";
import { UserInterface } from "../interfaces/user";
import { LocalStorage, requestHandler } from "../utils";
import Loader from "@/components/ui/Loader";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

// Create a context to manage authentication-related data and functions
const AuthContext = createContext<{
  user: UserInterface | null;
  token: string | null;
  login: (data: { username: string; password: string }) => Promise<void>;
  register: (data: {
    email: string;
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// Create a component that provides authentication-related data and functions
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Function to handle user login
  const login = async (data: { username: string; password: string }) => {
    await requestHandler(
      async () => await loginUser(data),
      null,
      (res) => {
        const { data } = res;
        setUser(data.user);
        setToken(data.accessToken);
        LocalStorage.set("user", data.user);
        LocalStorage.set("token", data.accessToken);
        redirect("/"); // Redirect to the chat page after successful login
      }
    );
  };

  // Function to handle user registration
  const register = async (data: {
    email: string;
    username: string;
    password: string;
  }) => {
    await requestHandler(
      async () => await registerUser(data),
      null,
      () => {
        toast({
          variant: "success",
          title: "Account created successfully! 🎉 ",
        });
        redirect("/login"); // Redirect to the login page after successful registration
      }
    );
  };

  // Function to handle user logout
  const logout = async () => {
    await requestHandler(
      async () => await logoutUser(),
      setIsLoading,
      () => {
        setUser(null);
        setToken(null);
        LocalStorage.clear(); // Clear local storage on logout
        redirect("/login"); // Redirect to the login page after successful logout
      }
    );
  };

  // Check for saved user and token in local storage during component initialization
  useEffect(() => {
    setIsLoading(true);
    const _token = LocalStorage.get("token");
    const _user = LocalStorage.get("user");
    if (_token && _user?._id) {
      setUser(_user);
      setToken(_token);
    }
    setIsLoading(false);
  }, []);

  // Provide authentication-related data and functions through the context
  return (
    <AuthContext.Provider value={{ user, login, register, logout, token }}>
      {isLoading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <Loader size={8} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };
