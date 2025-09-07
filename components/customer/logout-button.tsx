"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

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
    <Button onClick={handleLogout} variant={"destructive"}>
      Logout
    </Button>
  );
}
