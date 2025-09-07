"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import slugify from "slugify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const { data: userRes } = await supabase.auth.getUser();

    if (!userRes.user) {
      setLoading(false);
      toast.error("login first");
    } else {
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
      if (hErr) {
        setLoading(false);
        toast.error("Something went wrong, please try again.");
        console.log("hotel create error: " + hErr.message);
      }

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
      if (rErr) {
        setLoading(false);
        toast.error("Something went wrong, please try again.");
        console.log("request create error: " + rErr.message);
      }

      setLoading(false);
      toast.success("Request submitted. Developer will review.");

      setName("");
      setPrimary("#ffffff");
      setSecondary("#000000");
      setLogo("");
      setSelected([]);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center p-5">
      <div className="md:max-w-2xl w-full">
        <h1 className="text-2xl font-semibold mb-4">Setup your hotel</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="hotel name"
          />
          <div className="flex gap-2 items-center">
            <Label>Theme colors</Label>
            <Input
              className="w-9 p-1"
              type="color"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              disabled={loading}
            />
            <Input
              className="w-9 p-1"
              type="color"
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              disabled={loading}
            />
          </div>
          <Input
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            placeholder="logo URL"
            disabled={loading}
          />
          <div className="space-y-2">
            <Label className="font-semibold">Services</Label>
            <div className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <Checkbox
                    checked={selected.includes(s.id)}
                    onCheckedChange={() => toggle(s.id)}
                    disabled={loading}
                  />
                  <Label>
                    {s.name} — ₹{s.price}/mo
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Label>
            Estimated monthly: <span className="text-primary">₹{calc()}</span>
          </Label>
          <Button disabled={loading}>
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
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
