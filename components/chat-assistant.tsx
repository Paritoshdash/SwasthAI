"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "./providers/language-provider"

type Message = { role: "user" | "assistant"; content: string }

export function ChatAssistant() {
  const { t } = useI18n()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
    localStorage.setItem("he-chat", JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    const saved = localStorage.getItem("he-chat")
    if (saved) setMessages(JSON.parse(saved))
  }, [])

  const send = async () => {
    if (!input.trim()) return
    const newMsg: Message = { role: "user", content: input.trim() }
    setMessages((m) => [...m, newMsg])
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are a helpful healthcare assistant specialized in maternal & child health. Be clear, empathetic, and include a disclaimer to consult doctors for urgent issues. User: ${newMsg.content}`,
        }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: "assistant", content: data.text }])
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card id="consult" className="mt-6">
      <CardHeader>
        <CardTitle>{t("startConsultation")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={listRef} className="h-56 overflow-y-auto border rounded-md p-3 bg-card mb-3" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className="mb-2">
              <span className="text-xs text-muted-foreground">{m.role === "user" ? "You" : "Assistant"}</span>
              <p className="text-pretty">{m.content}</p>
            </div>
          ))}
          {loading && <p className="text-sm text-muted-foreground">Thinking…</p>}
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            aria-label="Message input"
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <Button onClick={send} disabled={loading}>
            Send
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Disclaimer: This assistant is informational and not a substitute for professional medical advice. For
          emergencies, call 112.
        </p>
      </CardContent>
    </Card>
  )
}
