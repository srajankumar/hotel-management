"use client";

import React from "react";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/customer/logout-button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CabBookingPage({
  params,
}: {
  params: Promise<{ hotel: string }>;
}) {
  const { hotel } = React.use(params);
  const hotelSlug = hotel;

  const [hotelData, setHotelData] = useState<{
    name: string;
    color_primary: string;
    color_secondary: string;
    logo_url: string;
  } | null>(null);

  const [form, setForm] = useState({
    trip_type: "oneway",
    from_location: "",
    to_location: "",
    vehicle_type: "",
    travel_datetime: "",
  });

  useEffect(() => {
    // fetch hotel theme
    fetch(`/api/hotel?slug=${hotelSlug}`)
      .then((res) => res.json())
      .then((data) => setHotelData(data))
      .catch(() => setHotelData(null));
  }, [hotelSlug]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const customer_id = localStorage.getItem("customer_id");
    if (!customer_id) {
      alert("Please register / log in as a customer first.");
      return;
    }

    const res = await fetch(`/api/cabs?hotel=${hotelSlug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, customer_id }),
    });
    const data = await res.json();

    if (res.ok) {
      alert("Cab booking successful!");
      console.log(data);
    } else {
      alert("Error booking cab: " + data.error);
    }
  }

  if (!hotelData) {
    return (
      <div className="text-center mt-10">
        <p>Loading hotel info…</p>
      </div>
    );
  }

  const primary = hotelData.color_primary || "#FACC15"; // fallback yellow
  const secondary = hotelData.color_secondary || "#FFFFFF";

  return (
    <div
      className="flex flex-col items-center"
      style={{ backgroundColor: secondary }}
    >
      <nav className="w-full p-5 flex justify-between absolute top-0">
        <Link href={`/${hotelSlug}`}>
          <Button variant={"outline"}>Go Back</Button>
        </Link>
        <LogoutButton hotel={hotelSlug} />
      </nav>

      <div className="w-96 my-20 md:px-0 px-10">
        <Image
          src={hotelData.logo_url}
          alt={hotelData.name}
          width={500}
          height={500}
        />
      </div>

      {/* booking card */}
      <div className="px-5 w-full max-w-md">
        <Card className="px-5 w-full" style={{ backgroundColor: secondary }}>
          <div className="flex rounded-lg overflow-hidden">
            <button
              type="button"
              className={`flex-1 py-2 font-semibold ${
                form.trip_type === "oneway" ? "text-white" : "text-gray-700"
              }`}
              style={{
                backgroundColor:
                  form.trip_type === "oneway" ? primary : "#f5f5f5",
              }}
              onClick={() => setForm((f) => ({ ...f, trip_type: "oneway" }))}
            >
              One Way
            </button>
            <button
              type="button"
              className={`flex-1 py-2 font-semibold ${
                form.trip_type === "round" ? "text-white" : "text-gray-700"
              }`}
              style={{
                backgroundColor:
                  form.trip_type === "round" ? primary : "#f5f5f5",
              }}
              onClick={() => setForm((f) => ({ ...f, trip_type: "round" }))}
            >
              Round Trip
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              name="from_location"
              placeholder="From"
              onChange={handleChange}
              value={form.from_location}
            />
            <Input
              name="to_location"
              placeholder="To"
              onChange={handleChange}
              value={form.to_location}
            />
            <Input
              name="vehicle_type"
              placeholder="Vehicle Type"
              onChange={handleChange}
              value={form.vehicle_type}
            />
            <Input
              name="travel_datetime"
              type="datetime-local"
              onChange={handleChange}
              value={form.travel_datetime}
            />
            <button
              type="submit"
              className="w-full py-3 font-semibold rounded-lg shadow text-white"
              style={{ backgroundColor: primary }}
            >
              Book Now
            </button>
          </form>
        </Card>
      </div>

      <div className="w-full relative">
        {/* optional car image */}
        <div className="absolute left-0 right-0 z-20">
          <img
            src="/assets/images/cab.png"
            alt="Car"
            className="w-[80%] md:w-[60%] lg:max-w-2xl mx-auto"
          />
        </div>

        <div
          className="w-full mt-20 absolute z-10"
          style={{ backgroundColor: secondary }}
        >
          <svg
            className="w-full h-auto"
            viewBox="0 0 1511 304"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M1515 0.5L0.5 140.5V309H1515V0.5Z" fill={primary} />
          </svg>
        </div>
      </div>
    </div>
  );
}
