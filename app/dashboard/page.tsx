"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [chat, setChat] = useState<{ role: string; content: string }[]>([])
  useEffect(() => {
    const saved = localStorage.getItem("he-chat")
    if (saved) setChat(JSON.parse(saved))
  }, [])
  return (
    <section className="container mx-auto px-4 py-12 grid gap-6">
      <h1 className="text-3xl font-semibold">Dashboard (Demo)</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No appointments scheduled.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Health Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Upload coming soon.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scheme Eligibility</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Complete your profile to check eligibility.</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Chat History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {chat.length === 0 ? (
            <p className="text-muted-foreground">No messages yet.</p>
          ) : (
            chat.map((m, i) => (
              <div key={i} className="border rounded-md p-2">
                <span className="text-xs text-muted-foreground">{m.role}</span>
                <p>{m.content}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 text-muted-foreground leading-relaxed">
            <li>Vaccination reminder: DTP-2 due next week.</li>
            <li>Wellness check: Consider a pediatric follow-up this month.</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
