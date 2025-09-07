"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CreateAccess() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/developer/create-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        full_name: name,
        developer_secret: process.env.NEXT_PUBLIC_DEVELOPER_SECRET,
      }),
    });
    const j = await res.json();
    if (!res.ok) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.: ");
      console.log("Error: ", JSON.stringify(j));
    } else {
      setSuccess(true);
      setLoading(false);
      setEmail("");
      setName("");
      toast.success("Admin created.");
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center p-5">
      <div className="sm:w-96 w-full">
        <h1 className="text-2xl font-semibold mb-4">Create Admin Access</h1>
        <form onSubmit={handleCreate} className="space-y-3">
          <Input
            required
            ref={inputRefs[0]}
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="admin full name"
            onKeyDown={(e) => handleKeyDown(e, 0)}
          />
          <Input
            required
            ref={inputRefs[1]}
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin email"
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
            Create
          </Button>
        </form>
        {success && (
          <div className="mt-2 text-sm">
            Admin access created!{" "}
            <Link
              href="/admin/login"
              className="text-primary underline underline-offset-4"
            >
              Log in as admin
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
