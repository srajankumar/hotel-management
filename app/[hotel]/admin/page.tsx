"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";

export default function HotelAdminPage() {
  const params = useParams() as { hotel?: string };
  const slug = params.hotel;
  const [hotel, setHotel] = useState<any>(null);

  useEffect(() => {
    if (slug) fetchHotel();
  }, [slug]);

  async function fetchHotel() {
    const { data, error } = await supabase
      .from("hotels")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) return console.error(error);
    setHotel(data);
  }

  if (!hotel) return <div className="p-6">Loading...</div>;
  if (!hotel.is_active)
    return <div className="p-6">Your subscription is not active yet.</div>;

  return (
    <div
      style={{ background: hotel.color_primary, color: hotel.color_secondary }}
      className="min-h-screen p-6"
    >
      <header className="flex items-center gap-4">
        {hotel.logo_url && (
          <img
            src={hotel.logo_url}
            alt="logo"
            className="w-16 h-16 object-cover rounded"
          />
        )}
        <h1 className="text-2xl font-bold">{hotel.name} — Admin</h1>
      </header>

      <nav className="mt-6 space-x-3">
        <a href={`/${slug}/admin/rooms`}>Rooms</a>
        <a href={`/${slug}/admin/cabs`} className="ml-4">
          Cabs
        </a>
        <a href={`/${slug}/admin/food`} className="ml-4">
          Food
        </a>
      </nav>
      <main className="mt-6">
        <p>Manage services from the links above.</p>
      </main>
    </div>
  );
}
