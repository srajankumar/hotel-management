// app/api/developer/handle-request/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabaseServer";
// import nodemailer from "nodemailer";

type Req = {
  id: string;
  action: "accept" | "reject";
  reason?: string;
  developer_secret?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as Req;
  const { id, action, reason } = body;

  if (body.developer_secret !== process.env.DEVELOPER_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!id || !action)
    return NextResponse.json({ error: "missing params" }, { status: 400 });

  // fetch the request row
  const { data: requestRow, error: fetchErr } = await supabaseServer
    .from("subscription_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchErr || !requestRow)
    return NextResponse.json({ error: "request not found" }, { status: 404 });

  const adminId = requestRow.admin_id;
  const hotelId = requestRow.hotel_id;

  if (action === "accept") {
    await supabaseServer
      .from("subscription_requests")
      .update({
        status: "accepted",
        developer_response: null,
        developer_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (hotelId) {
      await supabaseServer
        .from("hotels")
        .update({ is_active: true })
        .eq("id", hotelId);
    }

    // get admin email from profiles
    const { data: profile } = await supabaseServer
      .from("profiles")
      .select("email, full_name")
      .eq("id", adminId)
      .single();
    // const to = profile?.email;

    // if (to) {
    //   await sendMail({
    //     to,
    //     subject: "Subscription accepted",
    //     text: `Hi ${
    //       profile.full_name || ""
    //     },\n\nYour subscription request has been accepted. Your hotel is now active.\n\nLogin: <app-url>/${
    //       hotelId ? "" : ""
    //     }\n\nThanks.`,
    //   });
    // }

    return NextResponse.json({ ok: true });
  } else {
    // reject
    await supabaseServer
      .from("subscription_requests")
      .update({
        status: "rejected",
        developer_response: reason || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    const { data: profile } = await supabaseServer
      .from("profiles")
      .select("email, full_name")
      .eq("id", adminId)
      .single();
    // const to = profile?.email;
    // if (to) {
    //   await sendMail({
    //     to,
    //     subject: "Subscription rejected",
    //     text: `Hi ${
    //       profile.full_name || ""
    //     },\n\nYour subscription request has been rejected.\nReason: ${
    //       reason || "No reason provided"
    //     }\n\nPlease contact the developer for more info.`,
    //   });
    // }
    return NextResponse.json({ ok: true });
  }
}

// async function sendMail({
//   to,
//   subject,
//   text,
// }: {
//   to: string;
//   subject: string;
//   text: string;
// }) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT || 587),
//     secure: false,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.SMTP_USER,
//     to,
//     subject,
//     text,
//   });
// }
