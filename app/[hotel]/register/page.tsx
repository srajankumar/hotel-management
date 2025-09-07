// app/[hotel]/register/page.tsx
"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CustomerRegisterPage(props: {
  params: { hotel: string };
}) {
  const { hotel } = require("react").use(props.params);
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
      style={{
        backgroundColor: hotelData.color_secondary,
        height: "100dvh",
      }}
    >
      <div className="max-w-3xl mx-auto p-5 text-black">
        <div className="flex flex-col items-center">
          <div className="w-96 my-16">
            <Image
              src={hotelData.logo_url}
              alt={hotelData.name}
              width={500}
              height={500}
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-3 grid w-full">
            <Input name="name" placeholder="Name" onChange={handleChange} />
            <Input name="email" placeholder="Email" onChange={handleChange} />
            <Input name="phone" placeholder="Phone" onChange={handleChange} />
            <Input name="dob" type="date" onChange={handleChange} />
            <Input
              name="aadhar_number"
              placeholder="Aadhar Number"
              onChange={handleChange}
            />
            <Input
              name="number_of_people"
              type="number"
              placeholder="Number of People"
              onChange={handleChange}
            />
            <Input
              name="people_names"
              placeholder="People Names (comma separated)"
              onChange={handleChange}
            />

            <div>
              <label className="font-semibold">Select Services:</label>
              <div className="flex gap-2 mt-1">
                {["room", "cab", "food"].map((s) => (
                  <label key={s} className="flex items-center space-x-1">
                    <Input
                      type="checkbox"
                      checked={form.selected_services.includes(s)}
                      onChange={() => handleServiceToggle(s)}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: hotelData.color_primary }}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
