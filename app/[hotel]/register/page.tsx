// app/[hotel]/register/page.tsx
"use client";
import { useState } from "react";

export default function CustomerRegisterPage(props: {
  params: { hotel: string };
}) {
  const { hotel } = require("react").use(props.params);

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

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register at {hotel}</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="dob"
          type="date"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="aadhar_number"
          placeholder="Aadhar Number"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="number_of_people"
          type="number"
          placeholder="Number of People"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="people_names"
          placeholder="People Names (comma separated)"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <div>
          <label className="font-semibold">Select Services:</label>
          <div className="flex gap-2 mt-1">
            {["room", "cab", "food"].map((s) => (
              <label key={s} className="flex items-center space-x-1">
                <input
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
