// app/api/developer/create-admin/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import nodemailer from "nodemailer";

type ReqBody = {
  email: string;
  full_name?: string;
  password?: string; // optional — server can generate strong temp password
  developer_secret?: string; // simple gate — replace with proper auth
};

export async function POST(request: Request) {
  const body = (await request.json()) as ReqBody;
  const { email, full_name } = body;
  let { password } = body;

  if (!email)
    return NextResponse.json({ error: "email required" }, { status: 400 });

  // Replace this guard with proper developer auth check. For now ensure developer_secret matches env.
  if (body.developer_secret !== process.env.DEVELOPER_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // generate a temporary strong password if not provided
  //   if (!password) password = Math.random().toString(36).slice(-10) + "A1!";
  if (!password) password = "password";

  // create user via Supabase admin API using service role
  try {
    const { data: createdUser, error: createErr } =
      await supabaseServer.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (createErr || !createdUser.user) {
      console.error("create user error", createErr);
      return NextResponse.json(
        { error: createErr?.message || "failed to create user" },
        { status: 500 }
      );
    }

    const userId = createdUser.user.id;

    // Insert into profiles with role=admin and store email
    const { error: profileErr } = await supabaseServer
      .from("profiles")
      .insert([
        { id: userId, full_name: full_name || null, email, role: "admin" },
      ]);

    if (profileErr) {
      console.error("profile insert err", profileErr);
      // cleanup: delete user?
      return NextResponse.json({ error: profileErr.message }, { status: 500 });
    }

    console.log("User created with ID: " + userId + "Password:" + password);
    // Send email with credentials
    //     await sendMail({
    //       to: email,
    //       subject: "Your admin account for the Hotel SaaS",
    //       text: `Hello ${full_name || ""},

    // A developer created an admin account for you.

    // Login email: ${email}
    // Temporary password: ${password}

    // Please login at <your-app-url>/admin/login and change your password.

    // Thanks.
    // `,
    //     });

    return NextResponse.json({ ok: true, userId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

// helper mailer (nodemailer)
async function sendMail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  });
}
