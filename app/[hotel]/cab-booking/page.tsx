"use client";
import LogoutButton from "@/components/customer/logout-button";
import { useState } from "react";

export default function CabBookingPage(props: { params: { hotel: string } }) {
  const { hotel } = require("react").use(props.params);
  const [form, setForm] = useState({
    trip_type: "oneway",
    from_location: "",
    to_location: "",
    vehicle_type: "",
    travel_datetime: "", // changed field name for clarity
  });

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

    const res = await fetch(`/api/cabs?hotel=${hotel}`, {
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

  return (
    <div className="max-w-lg mx-auto">
      <nav>
        <LogoutButton hotel={hotel} />
      </nav>
      <h1 className="text-2xl font-bold mb-4">Book a Cab – {hotel}</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1 font-semibold">Trip Type</label>
          <select
            name="trip_type"
            value={form.trip_type}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="oneway">One Way</option>
            <option value="round">Round Trip</option>
          </select>
        </div>

        <input
          name="from_location"
          placeholder="From Location"
          onChange={handleChange}
          value={form.from_location}
          className="border p-2 w-full"
        />

        <input
          name="to_location"
          placeholder="To Location"
          onChange={handleChange}
          value={form.to_location}
          className="border p-2 w-full"
        />

        <input
          name="vehicle_type"
          placeholder="Vehicle Type (Sedan, SUV, etc.)"
          onChange={handleChange}
          value={form.vehicle_type}
          className="border p-2 w-full"
        />

        {/* ✅ combined date + time */}
        <input
          name="travel_datetime"
          type="datetime-local"
          onChange={handleChange}
          value={form.travel_datetime}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Book Cab
        </button>
      </form>
    </div>
  );
}
