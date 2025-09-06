"use client";
import React, { useState } from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";

export default function CreateRoom() {
  const params = useParams() as { hotel?: string };
  const slug = params.hotel;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const { data: hotel } = await supabase
      .from("hotels")
      .select("id")
      .eq("slug", slug)
      .single();
    if (!hotel?.id) return alert("hotel not found");
    const roomSlug = slugify(name, { lower: true, strict: true });
    const { error } = await supabase.from("rooms").insert([
      {
        hotel_id: hotel.id,
        name,
        slug: roomSlug,
        price_per_night: Number(price),
      },
    ]);
    if (error) return alert(error.message);
    router.push(`/${slug}/admin/rooms`);
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create Room</h2>
      <form onSubmit={handleCreate} className="space-y-3 max-w-md">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border"
          placeholder="Room name"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border"
          placeholder="Price per night"
        />
        <button className="px-3 py-1 bg-green-600 text-white">Create</button>
      </form>
    </div>
  );
}
