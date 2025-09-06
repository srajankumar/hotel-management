"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({ hotel }: { hotel: string }) {
  const router = useRouter();

  function handleLogout() {
    // clear local storage
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer_name");

    // redirect to the hotel registration page
    router.push(`/${hotel}/register`);
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}
