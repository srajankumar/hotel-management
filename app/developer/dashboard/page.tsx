"use client";
import React, { useEffect, useState } from "react";

type Req = {
  id: string;
  requested_services: string[];
  price_monthly: number;
  status: string;
  admin_id: string;
  hotel_id: string;
};

export default function DeveloperDashboard() {
  const [requests, setRequests] = useState<Req[]>([]);

  useEffect(() => {
    fetchReqs();
  }, []);

  async function fetchReqs() {
    const res = await fetch("/api/subscription-requests"); // simple proxy (or call supabase from client)
    const j = await res.json();
    setRequests(j || []);
  }

  async function handleAction(id: string, action: "accept" | "reject") {
    const reason =
      action === "reject" ? prompt("Reason for rejection?") || "" : "";
    const res = await fetch("/api/developer/handle-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        action,
        reason,
        developer_secret: process.env.NEXT_PUBLIC_DEVELOPER_SECRET,
      }),
    });
    if (res.ok) fetchReqs();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Developer Dashboard</h1>
      {requests.length === 0 && <p>No subscription requests yet.</p>}
      <div className="space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="p-3 border rounded">
            <div>
              <strong>Services:</strong> {r.requested_services?.join(", ")}
            </div>
            <div>
              <strong>Price:</strong> ₹{r.price_monthly}
            </div>
            <div>
              <strong>Status:</strong> {r.status}
            </div>
            {r.status === "pending" && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleAction(r.id, "accept")}
                  className="px-3 py-1 bg-green-600 text-white"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleAction(r.id, "reject")}
                  className="px-3 py-1 bg-red-600 text-white"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
