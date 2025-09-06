// app/api/customers/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // must be service key here
);

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const hotelSlug = searchParams.get("hotel");
  const body = await req.json();

  // 1. Get hotel id
  const { data: hotel, error: hotelError } = await supabase
    .from("hotels")
    .select("id")
    .eq("slug", hotelSlug)
    .single();

  if (hotelError || !hotel) {
    console.error("Hotel error", hotelError);
    return NextResponse.json({ error: "Hotel not found" }, { status: 400 });
  }

  // 2. Insert into customers
  const { data, error } = await supabase
    .from("customers")
    .insert([
      {
        hotel_id: hotel.id,
        name: body.name,
        email: body.email,
        phone: body.phone,
        dob: body.dob,
        aadhar_number: body.aadhar_number,
        number_of_people: body.number_of_people,
        people_names: body.people_names,
        selected_services: body.selected_services,
      },
    ])
    .select();

  if (error) {
    console.error("Insert error", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  console.log("Inserted customer", data);
  return NextResponse.json(data);
}
