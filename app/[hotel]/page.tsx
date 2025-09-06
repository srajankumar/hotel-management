"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "@/components/customer/logout-button";
export default function CustomerDashboard(props: {
  params: { hotel: string };
}) {
  // ✅ get the hotel slug from params
  const { hotel } = require("react").use(props.params);

  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // pull from localStorage
    const id = localStorage.getItem("customer_id");
    const name = localStorage.getItem("customer_name");
    setCustomerId(id);
    setCustomerName(name);

    // only fetch if id present
    if (id) {
      fetch(`/api/my-cabs?hotel=${hotel}&customer_id=${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Hotel not found or other error");
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

  return (
    <div className="max-w-2xl mx-auto space-y-4 p-4">
      <nav>
        <LogoutButton hotel={hotel} />
      </nav>
      <h1 className="text-2xl font-bold">Customer Dashboard – {hotel}</h1>

      {customerId ? (
        <div className="p-4 border rounded">
          <p>
            <span className="font-semibold">Customer Name:</span> {customerName}
          </p>
          <p>
            <span className="font-semibold">Customer ID:</span> {customerId}
          </p>
        </div>
      ) : (
        <p className="text-red-600">
          Please register/login as a customer first.
        </p>
      )}

      {/* ✅ Book Cab button */}
      <Link href={`/${hotel}/cab-booking`}>
        {" "}
        <Button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Book a Cab
        </Button>
      </Link>

      <h2 className="text-xl font-semibold">My Cab Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-2">
          {bookings.map((b) => (
            <li key={b.id} className="border p-3 rounded">
              <p className="font-semibold">{b.trip_type.toUpperCase()} Trip</p>
              <p>
                {b.from_location} → {b.to_location}
              </p>
              <p>Vehicle: {b.vehicle_type}</p>
              <p>Date: {b.travel_date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
