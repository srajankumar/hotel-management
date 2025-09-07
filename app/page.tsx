"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-stone-950/70 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-stone-900 shadow">
                {/* Concierge Bell */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M12 7a5 5 0 015 5h3a1 1 0 110 2H4a1 1 0 110-2h3a5 5 0 015-5zm-1-3a1 1 0 012 0v1h-2V4zM3 18a2 2 0 002 2h14a2 2 0 002-2H3z" />
                </svg>
              </span>
              <span className="font-semibold tracking-tight">GrandStay OS</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm text-stone-300">
              <a href="#features" className="hover:text-amber-300 transition">
                Features
              </a>
              <a href="#how" className="hover:text-amber-300 transition">
                How it works
              </a>
              <a href="#pricing" className="hover:text-amber-300 transition">
                Pricing
              </a>
              <a
                href="#testimonials"
                className="hover:text-amber-300 transition"
              >
                Stories
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/login"
                className="hidden sm:inline-flex rounded-md border border-stone-700 bg-stone-900 px-4 py-2 text-sm font-medium hover:border-amber-500/50 hover:text-amber-200 transition"
              >
                Admin Login
              </Link>
              <Link
                href="/developer/login"
                className="inline-flex rounded-md bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-2 text-sm font-semibold text-stone-950 shadow-sm hover:from-amber-400 hover:to-rose-400 transition"
              >
                Developer Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Decorative ambiance */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-600/20 blur-3xl" />
          <div className="absolute top-40 -right-16 h-72 w-72 rounded-full bg-rose-600/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-[36rem] bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-yellow-400/10 blur-2xl" />
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Subtle “hotel skyline” divider */}
          <div className="absolute bottom-0 left-0 right-0 h-20 opacity-20">
            <svg
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              className="w-full h-full text-stone-800 fill-current"
            >
              <path d="M0 80h80V30h80v50h80V50h80v30h80V10h80v70h80V40h80v40h80V20h80v60h80V35h80v45h80V25h80v55h80V0h80v80H0z" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-24 md:pt-24 md:pb-36">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
                <span className="inline-flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                Tailored for hotels, resorts, and boutique stays
              </div>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
                Run your hotel like a 5‑star
              </h1>
              <p className="mt-5 text-lg md:text-xl text-stone-300">
                Front desk, reservations, concierge cabs, and in‑room
                dining—unified in a beautifully branded portal your guests will
                love.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/developer/create-access"
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 text-stone-950 px-6 py-3 font-semibold shadow hover:shadow-lg hover:bg-amber-300 transition"
                >
                  Book a demo
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
                  </svg>
                </Link>
                <Link
                  href="/admin/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-stone-700 bg-stone-900 px-6 py-3 font-medium text-stone-100 hover:border-amber-500/50 hover:text-amber-200 transition"
                >
                  Try the admin
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 max-w-xl mx-auto text-sm text-stone-300">
                <div className="rounded-lg border border-stone-800 bg-stone-900/60 px-4 py-3">
                  <div className="text-2xl font-bold text-amber-300">+18%</div>
                  Direct bookings
                </div>
                <div className="rounded-lg border border-stone-800 bg-stone-900/60 px-4 py-3">
                  <div className="text-2xl font-bold text-amber-300">2.2x</div>
                  Faster check‑ins
                </div>
                <div className="rounded-lg border border-stone-800 bg-stone-900/60 px-4 py-3">
                  <div className="text-2xl font-bold text-amber-300">24/7</div>
                  Concierge portal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="relative py-20 bg-gradient-to-b from-stone-950 to-stone-900"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Luxury‑grade features. Boutique simplicity.
            </h2>
            <p className="mt-3 text-center text-stone-300">
              Everything you need to delight guests and streamline operations.
            </p>

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Room Reservations",
                  desc: "Live availability, upsells, flexible rates, and instant confirmations.",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
                    </svg>
                  ),
                },
                {
                  title: "Concierge & Cabs",
                  desc: "On‑demand rides and scheduled transfers with one‑way or round‑trip options.",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 13l2-5h14l2 5M5 18h14M6 13v5M18 13v5M8 18a1 1 0 11-2 0m12 0a1 1 0 11-2 0" />
                    </svg>
                  ),
                },
                {
                  title: "In‑Room Dining",
                  desc: "Beautiful QR menus, tabs, and real‑time order tracking for guests.",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 10h18M5 10V5m14 5V5M7 19v-6m10 6v-6M9 13h6" />
                    </svg>
                  ),
                },
                {
                  title: "Front Desk Suite",
                  desc: "Check‑ins, folios, housekeeping status, and late checkout handling.",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M4 20h16M4 14h16M4 8h10M4 4h6" />
                    </svg>
                  ),
                },
                {
                  title: "Branding & Themes",
                  desc: "Custom colors, logo, and a white‑label guest portal on your domain.",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M4 20h16M4 4h16M8 4v16M16 4v16" />
                    </svg>
                  ),
                },
                {
                  title: "Payments & Reports",
                  desc: "PCI‑compliant payments, deposits, refunds, and nightly revenue reports.",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 7h18v10H3zM3 10h18M7 15h4" />
                    </svg>
                  ),
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="group rounded-xl border border-stone-800 bg-stone-900/60 p-6 hover:border-amber-500/50 hover:bg-stone-900 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500/20 to-rose-500/20 text-amber-300 group-hover:from-amber-500/30 group-hover:to-rose-500/30">
                      {f.icon}
                    </span>
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-stone-300">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-20 bg-stone-900">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              From setup to first booking in a day
            </h2>
            <p className="mt-3 text-stone-300">
              Developers resell the platform to properties. Admins configure
              branding and services. Guests book through a beautiful hotel URL.
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Developers",
                  desc: "Deploy and resell. Earn recurring revenue.",
                },
                {
                  step: "2",
                  title: "Hotel Admins",
                  desc: "Set theme, rooms, rates, menus, and policies.",
                },
                {
                  step: "3",
                  title: "Guests",
                  desc: "Reserve rooms, request rides, and order dining—mobile first.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="rounded-xl border border-stone-800 bg-stone-900/60 p-6"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-300 font-semibold">
                    {s.step}
                  </div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-stone-300">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="py-20 bg-gradient-to-b from-stone-900 to-stone-950"
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">
                Simple, transparent pricing
              </h2>
              <p className="mt-3 text-stone-300">
                Start free. Scale as your property grows.
              </p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">Developer</h3>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300 border border-emerald-400/20">
                    For agencies
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold">$0</span>
                  <span className="ml-2 text-stone-300">forever</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-stone-300">
                  {[
                    "Unlimited test hotels",
                    "White‑label tools",
                    "Sandbox payments",
                  ].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{" "}
                      {i}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/developer/login"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-amber-400 text-stone-950 px-4 py-2.5 font-semibold hover:bg-amber-300 hover:shadow transition"
                >
                  Start building
                </Link>
              </div>

              <div className="relative rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-stone-900/60 p-6">
                <div className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-3 py-1 text-xs font-semibold text-stone-950 shadow">
                  Most popular
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">Hotel Admin</h3>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold">$49</span>
                  <span className="ml-2 text-stone-300">
                    per property / month
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-stone-300">
                  {[
                    "Rooms + Concierge + Dining modules",
                    "Custom domain & theme",
                    "Analytics & nightly reports",
                    "Priority support",
                  ].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />{" "}
                      {i}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/admin/login"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-2.5 font-semibold text-stone-950 hover:from-amber-400 hover:to-rose-400 transition"
                >
                  Start 14-day trial
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-stone-950">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Trusted by boutique and luxury properties
            </h2>
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {[
                {
                  quote:
                    "We cut check‑in times by 40% and increased direct bookings. Guests love the dining portal and the concierge requests.",
                  name: "Anika Rao",
                  role: "GM, Harborview Hotel",
                },
                {
                  quote:
                    "As an agency, we launch branded portals in hours. GrandStay OS looks and feels like a premium hotel site out of the box.",
                  name: "Luis Fernandez",
                  role: "Founder, Northpoint Dev",
                },
              ].map((t) => (
                <blockquote
                  key={t.name}
                  className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6"
                >
                  <p className="text-stone-200 leading-relaxed">“{t.quote}”</p>
                  <div className="mt-4 text-sm text-stone-300">
                    {t.name} — {t.role}
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-t from-stone-950 to-stone-900">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Give your guests a 5‑star digital experience
            </h2>
            <p className="mt-3 text-stone-300">
              Sign up your hotel today and elevate every stay.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/developer/login"
                className="inline-flex items-center justify-center rounded-md bg-amber-400 text-stone-950 px-6 py-3 font-semibold shadow hover:shadow-lg hover:bg-amber-300 transition"
              >
                Get Started
              </Link>
              <Link
                href="/admin/login"
                className="inline-flex items-center justify-center rounded-md border border-stone-700 bg-stone-900 px-6 py-3 font-medium text-stone-100 hover:border-amber-500/50 hover:text-amber-200 transition"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-400">
            <div>
              © {new Date().getFullYear()} GrandStay OS. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-amber-300 transition">
                Privacy
              </a>
              <a href="#" className="hover:text-amber-300 transition">
                Terms
              </a>
              <a href="#features" className="hover:text-amber-300 transition">
                Features
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
