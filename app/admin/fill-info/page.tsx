"use client";
import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import slugify from "slugify";
import { useRouter } from "next/navigation";

const SERVICES = [
  { id: "rooms", name: "Room booking", price: 2000 },
  { id: "cabs", name: "Cab booking", price: 1000 },
  { id: "food", name: "Food ordering", price: 1500 },
];

export default function FillInfo() {
  const [name, setName] = useState("");
  const [primary, setPrimary] = useState("#ffffff");
  const [secondary, setSecondary] = useState("#000000");
  const [logo, setLogo] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }
  function calc() {
    return selected.reduce(
      (s, id) => s + (SERVICES.find((x) => x.id === id)?.price || 0),
      0
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data: userRes } = await supabase.auth.getUser();
    if (!userRes.user) return alert("login first");

    const adminId = userRes.user.id;
    const slug = slugify(name, { lower: true, strict: true });

    const { data: hotelData, error: hErr } = await supabase
      .from("hotels")
      .insert([
        {
          admin_id: adminId,
          name,
          slug,
          color_primary: primary,
          color_secondary: secondary,
          logo_url: logo,
          services: selected,
        },
      ])
      .select()
      .single();
    if (hErr) return alert("hotel create error " + hErr.message);

    const price = calc();
    const { error: rErr } = await supabase
      .from("subscription_requests")
      .insert([
        {
          admin_id: adminId,
          hotel_id: hotelData.id,
          requested_services: selected,
          price_monthly: price,
          status: "pending",
        },
      ]);
    if (rErr) return alert("request err " + rErr.message);

    alert("Request submitted. Developer will review.");
    // you can route to a waiting page or the slug-based admin route
    router.push("/");
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Setup your hotel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Hotel name"
          className="w-full p-2 border"
        />
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
          />
          <input
            type="color"
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
          />
          <input
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            placeholder="Logo URL"
            className="flex-1 p-2 border"
          />
        </div>
        <div>
          <p className="font-semibold">Services</p>
          {SERVICES.map((s) => (
            <label key={s.id} className="block">
              <input
                type="checkbox"
                checked={selected.includes(s.id)}
                onChange={() => toggle(s.id)}
              />
              <span className="ml-2">
                {s.name} — ₹{s.price}/mo
              </span>
            </label>
          ))}
        </div>
        <div>
          <strong>Estimated monthly:</strong> ₹{calc()}
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white">Submit</button>
      </form>
    </div>
  );
}
