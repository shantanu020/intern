"use client";

import React, { useState, useMemo } from "react";
import { ConversationList, Thread } from "@/components/messaging/ConversationList";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { MessengerInput } from "@/components/messaging/MessengerInput";

const INITIAL_THREADS: Thread[] = [
  { id: 1, name: "Sarah K.", subtitle: "Draftly HQ", role: "Frontend Intern", preview: "Great, let's schedule a call...", unread: 2, time: "10:42 AM", avatar: "SK", isSystem: false },
  { id: 2, name: "Alex R.", subtitle: "Vercel", role: "Software Eng", preview: "Your portfolio looks excellent.", unread: 0, time: "Yesterday", avatar: "AR", isSystem: false },
  { id: 3, name: "Protocol Bot", subtitle: "InternConnect", role: "System", preview: "Your escrow payment has been rel...", unread: 0, time: "Monday", avatar: "PB", isSystem: true },
];

const INITIAL_MESSAGES = [
  { id: 1, threadId: 1, sender: "Sarah K.", text: "Hi! Thanks for applying to the Frontend Micro-Internship. We were really impressed by your React case study.", time: "10:30 AM", isMe: false },
  { id: 2, threadId: 1, sender: "Me", text: "Hi Sarah! Thank you so much. I'm really excited about the opportunity to work on the onboarding flow.", time: "10:35 AM", isMe: true },
  { id: 3, threadId: 1, sender: "Sarah K.", text: "Awesome. I'd love to jump on a quick 15-min call to discuss your availability next week.", time: "10:40 AM", isMe: false },
  { id: 4, threadId: 1, sender: "Sarah K.", text: "Great, let's schedule a call tomorrow at 2PM EST. Does that work for you?", time: "10:42 AM", isMe: false },
  { id: 5, threadId: 2, sender: "Alex R.", text: "Hi there! I was reviewing your github and your portfolio looks excellent. Are you free to chat next week?", time: "Yesterday", isMe: false },
  { id: 6, threadId: 3, sender: "System", text: "Your escrow payment has been released to your linked bank account.", time: "Monday", isMe: false },
];

export default function MessagesInbox() {
  const [activeThreadId, setActiveThreadId] = useState<number | string>(1);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [threads, setThreads] = useState(INITIAL_THREADS);

  const activeThread = useMemo(() => 
    threads.find(t => String(t.id) === String(activeThreadId)) || threads[0],
  [threads, activeThreadId]);

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
      threadId: activeThreadId as number,
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
    <div className="h-screen flex flex-col bg-background selection:bg-white selection:text-black overflow-hidden pt-16 lg:pt-0">
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Componentized Conversation List */}
        <div className="hidden md:flex w-[380px] flex-shrink-0 z-10 transition-all border-r border-edge">
          <ConversationList 
            threads={threads} 
            activeId={activeThreadId} 
            onSelect={handleThreadSelect} 
            title="Terminal / Inbox"
          />
        </div>

        {/* Right: Componentized Chat Stage */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <ChatWindow 
            messages={activeMessages} 
            activeThread={activeThread} 
          />
          
          {/* Composer */}
          <MessengerInput 
            onSend={handleSend} 
            disabled={activeThread.isSystem} 
          />
        </div>

      </div>
    </div>
  );
}
