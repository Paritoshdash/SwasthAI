'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, MessageSquare, PlusSquare, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

type Conversation = Message[];

export function ChatAssistant() {
  const [allConversations, setAllConversations] = useState<Conversation[]>([]);
  const [currentConversationIndex, setCurrentConversationIndex] = useState<number>(0);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsHistoryOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          setAllConversations(parsedHistory);
          setCurrentConversationIndex(0);
          return;
        }
      }
    } catch (error) {
      console.error("Failed to load or parse chat history:", error);
    }
    setAllConversations([
      [{ role: 'model', parts: [{ text: "Hello! I'm your health companion. How can I help you today?" }] }]
    ]);
  }, []);

  useEffect(() => {
    if (allConversations.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(allConversations));
    }
  }, [allConversations]);
  
  useEffect(() => {
    scrollToBottom();
  }, [allConversations, currentConversationIndex]);

  const scrollToBottom = () => {
    setTimeout(() => {
      const scrollViewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }, 100);
  };

  const handleNewChat = () => {
    const newConversation: Conversation = [{ role: 'model', parts: [{ text: "Hello! How may I assist you with your health questions?" }] }];
    setAllConversations(prev => [newConversation, ...prev]);
    setCurrentConversationIndex(0);
    if (isMobile) setIsHistoryOpen(false);
  };

  const handleSelectConversation = (index: number) => {
    setCurrentConversationIndex(index);
    if (isMobile) setIsHistoryOpen(false);
  };

  const handleDeleteConversation = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (allConversations.length <= 1) return;
    
    const newConversations = allConversations.filter((_, i) => i !== index);
    setAllConversations(newConversations);
    
    if (currentConversationIndex === index) {
      setCurrentConversationIndex(Math.max(0, index - 1));
    } else if (currentConversationIndex > index) {
      setCurrentConversationIndex(currentConversationIndex - 1);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentMessages = allConversations[currentConversationIndex] || [];
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    const updatedMessages = [...currentMessages, userMessage];
    
    const newAllConversations = [...allConversations];
    newAllConversations[currentConversationIndex] = updatedMessages;
    setAllConversations(newAllConversations);
    
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: currentMessages, message: input }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const botMessage: Message = { role: 'model', parts: [{ text: data.reply }] };
      
      const finalConversations = [...allConversations];
      finalConversations[currentConversationIndex] = [...updatedMessages, botMessage];
      setAllConversations(finalConversations);

    } catch (error) {
      console.error('Failed to fetch chatbot response:', error);
      const errorMessage: Message = { role: 'model', parts: [{ text: "I'm sorry, I'm having trouble connecting. Please try again later." }] };
      const errorConversations = [...allConversations];
      errorConversations[currentConversationIndex] = [...updatedMessages, errorMessage];
      setAllConversations(errorConversations);
    } finally {
      setIsLoading(false);
    }
  };

  const getConversationTitle = (convo: Conversation, index: number) => {
    const userMessage = convo.find(msg => msg.role === 'user');
    if (userMessage) {
      return userMessage.parts[0].text.slice(0, 30) + (userMessage.parts[0].text.length > 30 ? '...' : '');
    }
    return `Conversation ${index + 1}`;
  };

  const currentMessages = allConversations[currentConversationIndex] || [];

  return (
    <div className="flex w-full max-w-6xl h-[75vh] sm:h-[80vh] shadow-2xl border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-background">
      {/* Sidebar - Chat History */}
      <div className={`bg-muted/50 dark:bg-gray-800 border-r transition-all duration-300 ease-in-out ${
        isHistoryOpen ? 'w-64 md:w-80 opacity-100' : 'w-0 opacity-0 md:opacity-100 md:w-16'
      } ${isMobile && !isHistoryOpen ? 'hidden' : 'flex'} flex-col`}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b flex items-center justify-between">
          {isHistoryOpen && (
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat History
            </h3>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="hover:bg-background/50 transition-all duration-300"
          >
            {isHistoryOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {allConversations.map((convo, index) => (
              <div
                key={index}
                className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  currentConversationIndex === index
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-background hover:bg-muted/70 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleSelectConversation(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      currentConversationIndex === index ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                      {getConversationTitle(convo, index)}
                    </p>
                    <p className={`text-xs mt-1 ${
                      currentConversationIndex === index ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {convo.length} messages
                    </p>
                  </div>
                  
                  {allConversations.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                        currentConversationIndex === index ? 'hover:bg-primary-foreground/20' : 'hover:bg-destructive'
                      }`}
                      onClick={(e) => handleDeleteConversation(index, e)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* New Chat Button */}
        <div className="p-4 border-t">
          <Button
            onClick={handleNewChat}
            className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95"
            size="sm"
          >
            <PlusSquare className="h-4 w-4 mr-2" />
            {isHistoryOpen && "New Chat"}
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col border-0 rounded-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className="text-primary-foreground hover:bg-white/20 transition-all duration-300 hover:scale-110 md:hidden"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <CardTitle className="text-lg sm:text-xl">SwasthAI Health Companion</CardTitle>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewChat}
            className="text-primary-foreground hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <PlusSquare className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 p-0 min-h-0 bg-gradient-to-b from-background to-muted/20">
          <ScrollArea className="h-full p-4 sm:p-6" ref={scrollAreaRef}>
            <div className="flex flex-col gap-4 sm:gap-6">
              {currentMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-300 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="bg-primary text-primary-foreground rounded-full p-2 flex-shrink-0 shadow-md hover:scale-105 transition-transform duration-200">
                      <Bot size={20} />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm break-words shadow-sm hover:shadow-md transition-all duration-300 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto hover:scale-105'
                        : 'bg-muted text-foreground hover:scale-105'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.parts[0].text}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="bg-muted text-foreground rounded-full p-2 flex-shrink-0 shadow-md hover:scale-105 transition-transform duration-200">
                      <User size={20} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start animate-pulse">
                  <div className="bg-primary text-primary-foreground rounded-full p-2">
                    <Bot size={20} />
                  </div>
                  <div className="bg-muted rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-4 sm:p-6 border-t bg-background/50 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="flex w-full items-end gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <Input
                id="message"
                placeholder="Type your health question..."
                className="flex-1 pr-12 text-sm sm:text-base rounded-2xl h-12 sm:h-14 shadow-sm focus:shadow-md transition-all duration-300"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              ) : (
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}