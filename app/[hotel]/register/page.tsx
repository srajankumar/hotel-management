// app/[hotel]/register/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";

export default function CustomerRegisterPage({
  params,
}: {
  params: Promise<{ hotel: string }>;
}) {
  const { hotel } = React.use(params);
  const [hotelData, setHotelData] = useState<{
    name: string;
    color_primary: string;
    color_secondary: string;
    logo_url: string;
    services: string[];
  } | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    aadhar_number: "",
    number_of_people: 1,
    people_names: "",
    selected_services: [] as string[],
  });

  useEffect(() => {
    // fetch hotel info from Supabase API route
    fetch(`/api/hotel?slug=${hotel}`)
      .then((res) => {
        if (!res.ok) throw new Error("Hotel not found");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setHotelData(data);
      })
      .catch((err) => console.error(err));
  }, [hotel]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleServiceToggle(service: string) {
    setForm((prev) => {
      const exists = prev.selected_services.includes(service);
      return {
        ...prev,
        selected_services: exists
          ? prev.selected_services.filter((s) => s !== service)
          : [...prev.selected_services, service],
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/customers?hotel=${hotel}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        people_names: form.people_names.split(",").map((n) => n.trim()),
      }),
    });

    const data = await res.json();

    // Save customer id + name in localStorage
    if (res.ok && data && data[0]) {
      localStorage.setItem("customer_id", data[0].id);
      localStorage.setItem("customer_name", data[0].name);
    }

    // After registration, go to the customer dashboard
    window.location.href = `/${hotel}`;
  }

  if (!hotelData)
    return (
      <div className="max-w-lg mx-auto mt-10 text-center">
        <p>Loading hotel info…</p>
      </div>
    );

  return (
    <div
      className="flex flex-col items-center"
      style={{ backgroundColor: hotelData.color_secondary }}
    >
      <div className="max-w-3xl mx-auto p-5 text-black pb-20">
        <div className="flex flex-col items-center">
          <div className="w-96 my-20 md:px-0 px-10">
            <Image
              src={hotelData.logo_url}
              alt={hotelData.name}
              width={500}
              height={500}
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 grid w-full">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                required
                id="name"
                name="name"
                placeholder="Enter your full name"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                required
                id="email"
                name="email"
                placeholder="Enter your email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                required
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                required
                id="dob"
                name="dob"
                type="date"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="aadhar_number">Aadhar Number</Label>
              <Input
                required
                id="aadhar_number"
                name="aadhar_number"
                placeholder="Enter your Aadhar number"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="number_of_people">Number of People</Label>
              <Input
                required
                id="number_of_people"
                name="number_of_people"
                type="number"
                placeholder="Total number of guests"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="people_names">
                People Names (comma separated)
              </Label>
              <Input
                id="people_names"
                name="people_names"
                placeholder="Guest names (comma separated)"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="font-semibold">Select Services:</Label>
              <div className="flex gap-2 mt-1">
                {["room", "cab", "food"].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <Checkbox
                      id={`service_${s}`}
                      checked={form.selected_services.includes(s)}
                      onCheckedChange={() => handleServiceToggle(s)}
                    />
                    <Label htmlFor={`service_${s}`}>{s}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Button
              type="submit"
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: hotelData.color_primary }}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
