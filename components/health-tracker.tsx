"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { differenceInWeeks, addWeeks, format } from "date-fns"

type ScheduleItem = { name: string; due: Date }

const baseScheduleWeeks = [
  { name: "BCG + OPV-0", weeks: 0 },
  { name: "Hep B-1", weeks: 0 },
  { name: "DTP-1 + IPV-1 + Hib-1 + Hep B-2 + Rotavirus-1", weeks: 6 },
  { name: "DTP-2 + IPV-2 + Hib-2 + Rotavirus-2", weeks: 10 },
  { name: "DTP-3 + IPV-3 + Hib-3 + Hep B-3 + Rotavirus-3", weeks: 14 },
  { name: "MMR-1", weeks: 36 }, // ~9 months
]

export function HealthTracker() {
  const [dob, setDob] = useState<string>("")
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])

  useEffect(() => {
    if (!dob) {
      setSchedule([])
      return
    }
    const birth = new Date(dob)
    const sch = baseScheduleWeeks.map((it) => ({ name: it.name, due: addWeeks(birth, it.weeks) }))
    setSchedule(sch)
  }, [dob])

  const weeksOld = dob ? differenceInWeeks(new Date(), new Date(dob)) : null

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Maternal & Child Health Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 max-w-sm">
          <Label htmlFor="dob">Child Date of Birth</Label>
          <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        {weeksOld !== null && <p className="text-sm text-muted-foreground">Child age: {weeksOld} weeks</p>}
        <div className="grid gap-3">
          {schedule.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between border rounded-md p-3 bg-secondary"
              role="listitem"
              aria-label={`Schedule item ${s.name}`}
            >
              <span>{s.name}</span>
              <span className="text-sm text-muted-foreground">{format(s.due, "PPP")}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
