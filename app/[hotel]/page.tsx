"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "@/components/customer/logout-button";
import Image from "next/image";
import { Car, House, Utensils } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Hotel {
  id: string;
  name: string;
  logo_url: string;
  color_primary: string;
  color_secondary: string;
  services: string[];
}

type Booking = {
  id: string;
  trip_type: string;
  from_location: string;
  to_location: string;
  vehicle_type: string;
  travel_datetime: string;
};

export default function CustomerDashboard({
  params,
}: {
  params: Promise<{ hotel: string }>;
}) {
  const { hotel } = React.use(params); // unwrap params in client component

  const [hotelInfo, setHotelInfo] = useState<Hotel | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

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

  // const { name, color_primary, color_secondary, services } = hotelInfo;

  return (
    <div
      style={{
        backgroundColor: hotelInfo.color_secondary,
        height: "100dvh",
      }}
    >
      <div className="max-w-3xl mx-auto p-5 text-black pb-20">
        <div className="flex flex-col items-center">
          <div className="w-96 my-16">
            <Image
              src={hotelInfo.logo_url}
              alt={hotelInfo.name}
              width={500}
              height={500}
            />
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-semibold mb-5">{hotelInfo.name}</h1>
            {customerId ? (
              <p>
                Hello, <span className="font-bold">{customerName}</span>
              </p>
            ) : (
              <p className="text-red-600">
                Please register as a customer first.
              </p>
            )}

            {customerId ? (
              <nav className="my-5 flex flex-wrap gap-3">
                {/* dynamically render service buttons */}
                {hotelInfo.services.includes("rooms") && (
                  <Link href={`/${hotel}/room-booking`}>
                    <div className="w-40 h-40 border-dashed border-2 transition-all duration-300 hover:bg-secondary/50 rounded-md flex justify-center items-center flex-col">
                      <House
                        style={{
                          color: hotelInfo.color_primary,
                        }}
                        className="w-16 h-16 opacity-50"
                      />
                      <Label>Book a Room</Label>
                    </div>
                  </Link>
                )}

                {hotelInfo.services.includes("cabs") && (
                  <Link href={`/${hotel}/cab-booking`}>
                    <div className="w-40 h-40 border-dashed border-2 transition-all duration-300 hover:bg-secondary/50 rounded-md flex justify-center items-center flex-col">
                      <Car
                        style={{
                          color: hotelInfo.color_primary,
                        }}
                        className="w-16 h-16 opacity-50"
                      />
                      <Label>Book a Cab</Label>
                    </div>
                  </Link>
                )}

                {hotelInfo.services.includes("food") && (
                  <Link href={`/${hotel}/food-ordering`}>
                    <div className="w-40 h-40 border-dashed border-2 transition-all duration-300 hover:bg-secondary/50 rounded-md flex justify-center items-center flex-col">
                      <Utensils
                        style={{
                          color: hotelInfo.color_primary,
                        }}
                        className="w-16 h-16 opacity-50"
                      />
                      <Label>Order Food</Label>
                    </div>
                  </Link>
                )}
                <LogoutButton hotel={hotel} />
              </nav>
            ) : (
              <nav className="my-5 flex flex-wrap gap-3">
                <Link href={`/${hotel}/register`}>
                  <Button
                    style={{
                      backgroundColor: hotelInfo.color_primary,
                      color: hotelInfo.color_secondary,
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
      </div>
    </div>
  );
}
