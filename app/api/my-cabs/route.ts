// app/api/my-cabs/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const hotelSlug = searchParams.get("hotel");
  const customer_id = searchParams.get("customer_id");

  if (!hotelSlug || !customer_id) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  // validate hotel slug
  const { data: hotel, error: hotelError } = await supabase
    .from("hotels")
    .select("id")
    .eq("slug", hotelSlug)
    .single();

  if (hotelError || !hotel)
    return NextResponse.json({ error: "Hotel not found" }, { status: 404 });

  const { data, error } = await supabase
    .from("cab_bookings")
    .select("*")
    .eq("hotel_id", hotel.id)
    .eq("customer_id", customer_id)
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
