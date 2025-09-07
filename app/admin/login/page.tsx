"use client";
import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const inputRefs = [
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ];

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputRefs[idx + 1]) {
        inputRefs[idx + 1].current?.focus();
      }
    }
  }

  async function handleLogin(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
    // after login, redirect to admin fill page
    router.push("/admin/fill-info");
  }

  return (
    <div className="flex min-h-dvh items-center justify-center p-5">
      <div className="sm:w-96 w-full">
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-3">
          <Input
            required
            ref={inputRefs[0]}
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin email"
            onKeyDown={(e) => handleKeyDown(e, 0)}
          />
          <div className="mt-1 text-sm">
            for trial users, the password is{" "}
            <span className="text-primary">{`"password"`}</span>
          </div>
          <Input
            required
            ref={inputRefs[1]}
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />

          <Button className="w-full" disabled={loading}>
            {loading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            )}
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
