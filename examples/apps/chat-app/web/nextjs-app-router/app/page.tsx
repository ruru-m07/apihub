"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user, logout } = useAuth();
  const heandelLogout = async () => {
    await logout()
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <>
          <h1>Welcome {user.username}</h1>
          <Button onClick={heandelLogout}>Logout</Button>
        </>
      ) : (
        <>
          <h1>Welcome to the chat app</h1>
          <Link href={"/login"}> Login </Link>
        </>
      )}
    </main>
  );
}
