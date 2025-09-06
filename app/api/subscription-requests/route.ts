// app/api/subscription-requests/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // must be service key for RLS bypass
);

export async function GET() {
  // Get all pending subscription requests
  const { data, error } = await supabase
    .from("subscription_requests")
    .select("*")
    .eq("status", "pending");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { request_id, status, reason } = body;

  const updateData: any = { status };
  if (reason) updateData.reason = reason;

  const { data, error } = await supabase
    .from("subscription_requests")
    .update(updateData)
    .eq("id", request_id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // You could also send an email notification here (via Resend, SendGrid, etc.)

  return NextResponse.json(data);
}
