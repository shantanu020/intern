"use client";

import React, { useState, useMemo } from "react";
import { ConversationList, Thread } from "@/components/messaging/ConversationList";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { MessengerInput } from "@/components/messaging/MessengerInput";

const INITIAL_THREADS: Thread[] = [
  { id: "C1", name: "Aryan Sharma", subtitle: "IIT Bombay", role: "Frontend Intern", preview: "Thanks for the feedback!", unread: 1, time: "9:15 AM", avatar: "AS", isSystem: false },
  { id: "C2", name: "Priya Patel", subtitle: "NID Ahmedabad", role: "Product Design", preview: "I've uploaded the Figma file.", unread: 0, time: "Yesterday", avatar: "PP", isSystem: false },
  { id: "C3", name: "Rahul Singh", subtitle: "IIT Delhi", role: "Growth Marketing", preview: "When do the interviews start?", unread: 0, time: "2 days ago", avatar: "RS", isSystem: false },
];

const INITIAL_MESSAGES = [
  { id: 1, threadId: "C1", sender: "Me", text: "Hi Aryan, your React case study was impressive. Can we jump on a call?", time: "9:00 AM", isMe: true },
  { id: 2, threadId: "C1", sender: "Aryan Sharma", text: "Hi! Absolutely, I'm free tomorrow after 2 PM. Thanks for the feedback!", time: "9:15 AM", isMe: false },
  { id: 3, threadId: "C2", sender: "Priya Patel", text: "I've uploaded the Figma file for the onboarding redesign.", time: "Yesterday", isMe: false },
];

export default function CompanyMessagesPage() {
  const [activeThreadId, setActiveThreadId] = useState<number | string>("C1");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [threads, setThreads] = useState(INITIAL_THREADS);

  // Recruiter-specific contextual data (mock matching scores)
  const candidateSignals: Record<string, number> = {
    "C1": 96,
    "C2": 92,
    "C3": 85
  };

  const activeThread = useMemo(() => {
    const thread = threads.find(t => String(t.id) === String(activeThreadId)) || threads[0];
    return {
      ...thread,
      signal: candidateSignals[String(thread.id)]
    };
  }, [threads, activeThreadId]);

  const activeMessages = useMemo(() => 
    messages.filter(m => String(m.threadId) === String(activeThreadId)),
  [messages, activeThreadId]);

  const handleThreadSelect = (id: number | string) => {
    setActiveThreadId(id);
    setThreads(prev => prev.map(t => String(t.id) === String(id) ? { ...t, unread: 0 } : t));
  };

  const handleSend = (text: string) => {
    const newMsg = {
      id: Date.now(),
      threadId: activeThreadId,
      sender: "Me",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages(prev => [...prev, newMsg]);
    setThreads(prev => prev.map(t => 
      String(t.id) === String(activeThreadId)
        ? { ...t, preview: text, time: "Just now" } 
        : t
    ));
  };

  return (
    <div className="h-[calc(100vh-64px)] -m-6 md:-m-8 flex flex-col bg-background selection:bg-white selection:text-black overflow-hidden shadow-premium border border-edge rounded-sm">
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Recruiter Pipeline Sidebar */}
        <div className="hidden lg:flex w-[380px] flex-shrink-0 z-10 transition-all border-r border-edge">
          <ConversationList 
            threads={threads} 
            activeId={activeThreadId} 
            onSelect={handleThreadSelect} 
            title="Recruiter / Talent Pipeline"
          />
        </div>

        {/* Right: Active Interview Thread */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <ChatWindow 
            messages={activeMessages} 
            activeThread={activeThread} 
          />
          
          <MessengerInput 
            onSend={handleSend} 
          />
        </div>

      </div>
    </div>
  );
}
