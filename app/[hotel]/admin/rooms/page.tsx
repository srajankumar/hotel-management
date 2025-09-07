"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

type Room = {
  id: string;
  name: string;
  price_per_night: number;
  hotel_id: string;
  // Add other fields as needed
};

export default function RoomsList() {
  const params = useParams() as { hotel?: string };
  const slug = params.hotel;
  const [rooms, setRooms] = useState<Room[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (slug) fetchRooms();
  }, [slug]);

  async function fetchRooms() {
    // Get hotel id first
    const { data: hotel } = await supabase
      .from("hotels")
      .select("id")
      .eq("slug", slug)
      .single();
    if (!hotel?.id) return;
    const { data } = await supabase
      .from("rooms")
      .select("*")
      .eq("hotel_id", hotel.id);
    setRooms(data || []);
  }

  function goCreate() {
    router.push(`/${slug}/admin/rooms/create`);
  }
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Rooms</h2>
      <button
        onClick={goCreate}
        className="px-3 py-1 bg-blue-600 text-white mb-4"
      >
        Create room
      </button>
      <div className="space-y-3">
        {rooms.map((r) => (
          <div key={r.id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <strong>{r.name}</strong>
                <div>₹{r.price_per_night}</div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() =>
                    router.push(`/${slug}/admin/rooms/${r.id}/edit`)
                  }
                  className="px-2 py-1 bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Delete?")) return;
                    await supabase.from("rooms").delete().eq("id", r.id);
                    fetchRooms();
                  }}
                  className="px-2 py-1 bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
