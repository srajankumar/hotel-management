"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "@/components/customer/logout-button";

interface Hotel {
  id: string;
  name: string;
  color_primary: string;
  color_secondary: string;
  services: string[];
}

export default function CustomerDashboard({
  params,
}: {
  params: Promise<{ hotel: string }>;
}) {
  const { hotel } = require("react").use(params); // unwrap params in client component

  const [hotelInfo, setHotelInfo] = useState<Hotel | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    // 1. fetch hotel info from API
    fetch(`/api/hotel?slug=${hotel}`)
      .then((res) => {
        if (!res.ok) throw new Error("Hotel not found");
        return res.json();
      })
      .then((data) => setHotelInfo(data))
      .catch((err) => setError(err.message));

    // 2. get customer from localStorage
    const id = localStorage.getItem("customer_id");
    const name = localStorage.getItem("customer_name");
    setCustomerId(id);
    setCustomerName(name);

    // 3. fetch bookings if logged in
    if (id) {
      fetch(`/api/my-cabs?hotel=${hotel}&customer_id=${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Bookings not found");
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) setBookings(data);
        })
        .catch((err) => setError(err.message));
    }
  }, [hotel]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Not Found</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!hotelInfo) {
    return <div className="max-w-2xl mx-auto mt-8">Loading...</div>;
  }

  const { name, color_primary, color_secondary, services } = hotelInfo;

  return (
    <div
      style={{
        background: color_secondary,
        color: color_primary,
        height: "100dvh",
      }}
    >
      <div className="max-w-2xl mx-auto px-5 py-10">
        <h1 className="text-2xl font-semibold mb-5">{name}</h1>
        {customerId ? (
          <p>
            Hello, <span className="font-bold">{customerName}</span>
          </p>
        ) : (
          <p className="text-red-600">Please register as a customer first.</p>
        )}

        {customerId ? (
          <nav className="my-5 flex flex-wrap gap-3">
            {/* dynamically render service buttons */}
            {services.includes("cab") && (
              <Link href={`/${hotel}/cab-booking`}>
                <Button
                  style={{
                    backgroundColor: color_primary,
                    color: color_secondary,
                  }}
                >
                  Book a Cab
                </Button>
              </Link>
            )}
            {services.includes("room") && (
              <Link href={`/${hotel}/room-booking`}>
                <Button
                  style={{
                    backgroundColor: color_primary,
                    color: color_secondary,
                  }}
                >
                  Book a Room
                </Button>
              </Link>
            )}
            {services.includes("food") && (
              <Link href={`/${hotel}/food-ordering`}>
                <Button
                  style={{
                    backgroundColor: color_primary,
                    color: color_secondary,
                  }}
                >
                  Order Food
                </Button>
              </Link>
            )}
            <LogoutButton hotel={hotel} />
          </nav>
        ) : (
          <nav className="my-5 flex flex-wrap gap-3">
            <Link href={`/${hotel}/register`}>
              <Button
                style={{
                  backgroundColor: color_primary,
                  color: color_secondary,
                }}
              >
                Register Here
              </Button>
            </Link>
          </nav>
        )}

        <div className="py-5 grid gap-3">
          <h2 className="text-lg font-semibold">My Cab Bookings</h2>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul className="space-y-2">
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className="border p-3 rounded bg-white text-black"
                >
                  <p className="font-semibold">
                    {b.trip_type.toUpperCase()} Trip
                  </p>
                  <p>
                    {b.from_location} → {b.to_location}
                  </p>
                  <p>Vehicle: {b.vehicle_type}</p>
                  <p>Date: {b.travel_datetime}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
