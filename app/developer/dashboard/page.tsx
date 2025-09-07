"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    <div className="max-w-2xl mx-auto px-5 py-20">
      <h1 className="text-2xl font-semibold mb-5">Developer Dashboard</h1>

      {requests.length === 0 && (
        <Card>
          <CardContent>
            <Label>No subscription requests yet.</Label>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {requests.map((r) => (
          <Card key={r.id} className="p-3 border rounded">
            <CardContent className="p-3">
              <div className="grid gap-3">
                <Label>Services: {r.requested_services?.join(", ")}</Label>
                <Label>Price: ₹{r.price_monthly}</Label>
                <Label>Status: {r.status}</Label>
                {r.status === "pending" && (
                  <div className="mt-2 flex gap-2">
                    <Button
                      onClick={() => handleAction(r.id, "accept")}
                      variant={"success"}
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleAction(r.id, "reject")}
                      variant={"destructive"}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
