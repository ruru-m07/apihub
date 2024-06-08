"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useAuth();

  if (user) {
    redirect("/");
  }

  return (
    <div className="h-screen flex justify-center items-center">{children}</div>
  );
};

export default AuthLayout;
