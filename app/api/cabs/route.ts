// app/api/cabs/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const hotelSlug = searchParams.get("hotel");
  const body = await req.json();

  // find hotel id
  const { data: hotel, error: hotelError } = await supabase
    .from("hotels")
    .select("id")
    .eq("slug", hotelSlug)
    .single();

  if (hotelError || !hotel) {
    return NextResponse.json({ error: "Hotel not found" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("cab_bookings")
    .insert([
      {
        hotel_id: hotel.id,
        customer_id: body.customer_id,
        trip_type: body.trip_type,
        from_location: body.from_location,
        to_location: body.to_location,
        vehicle_type: body.vehicle_type,
        travel_datetime: body.travel_datetime,
      },
    ])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
