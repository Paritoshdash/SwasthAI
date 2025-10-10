"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";

// Utility for joining classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Define message types
interface ChatPart {
  text: string;
}

interface ChatMessage {
  role: "user" | "model";
  parts: ChatPart[];
}

export function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    // ✅ Explicitly cast message type
    const newMessage: ChatMessage = { role: "user", parts: [{ text: userInput }] };
    const updatedMessages: ChatMessage[] = [...messages, newMessage];

    setMessages(updatedMessages);
    setUserInput("");
    setIsLoading(true);
    setError(null);

    try {
      await callGeminiAPI(updatedMessages);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Sorry, I'm having trouble connecting. Please try again later.");
      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: "Sorry, I'm having trouble connecting. Please try again later." }] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Gemini API call (safe)
  const callGeminiAPI = async (chatHistory: ChatMessage[]) => {
    const systemPrompt =
      "You are a friendly and helpful AI health assistant. Provide safe, general health info. Always remind users to consult a real healthcare professional for diagnosis or emergencies.";

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing Gemini API key. Add it to .env.local");

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: chatHistory,
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate?.content?.parts?.[0]?.text) {
      const reply: ChatMessage = {
        role: "model",
        parts: [{ text: candidate.content.parts[0].text }],
      };
      setMessages((prev) => [...prev, reply]);
    } else {
      throw new Error("Invalid API response structure.");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Bot className="w-8 h-8 text-blue-500" />
          Health AI Assistant
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn("flex items-start gap-3", msg.role === "user" && "justify-end")}
              >
                {msg.role === "model" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <Bot size={20} />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    "p-3 rounded-2xl max-w-sm md:max-w-md lg:max-w-lg",
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-gray-800 rounded-bl-none"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.parts[0]?.text ?? ""}</p>
                </div>

                {msg.role === "user" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <User size={20} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 rounded-bl-none flex space-x-2">
                  <span className="typing-dot"></span>
                  <span className="typing-dot delay-200"></span>
                  <span className="typing-dot delay-400"></span>
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a health question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !userInput.trim()}>
              <Send className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </CardContent>

      <style>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          background-color: #3b82f6;
          border-radius: 50%;
          display: inline-block;
          animation: typing 1s infinite ease-in-out;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </Card>
  );
}
