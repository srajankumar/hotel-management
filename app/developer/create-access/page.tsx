"use client";
import React, { useState } from "react";

export default function CreateAccess() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Creating...");
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
    if (!res.ok) setMsg("Error: " + JSON.stringify(j));
    else setMsg("Admin created & email sent.");
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Developer — Create Admin access
      </h1>
      <form onSubmit={handleCreate} className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Admin full name"
          className="w-full p-2 border"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin email"
          className="w-full p-2 border"
        />
        <button className="px-4 py-2 bg-blue-600 text-white">Create</button>
      </form>
      {msg && <p className="mt-2">{msg}</p>}
    </div>
  );
}
