"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Search, MessageCircle, Shield, Clock, Menu } from "lucide-react"

// Mock active chats
const mockChats = [
  {
    id: 1,
    name: "Anonymous User #2847",
    lastMessage: "Thank you for listening, it really helps",
    time: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Anonymous User #1923",
    lastMessage: "I've been feeling better lately",
    time: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Anonymous User #5612",
    lastMessage: "Can we talk about anxiety?",
    time: "3h ago",
    unread: 1,
    online: false,
  },
]

// Mock messages
const mockMessages = [
  {
    id: 1,
    sender: "them",
    message: "Hi, I've been struggling with stress lately",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "me",
    message: "I understand how you feel. What's been causing the stress?",
    time: "10:32 AM",
  },
  {
    id: 3,
    sender: "them",
    message: "Work has been overwhelming and I can't seem to find balance",
    time: "10:35 AM",
  },
  {
    id: 4,
    sender: "me",
    message: "That sounds really challenging. Have you tried any stress management techniques?",
    time: "10:37 AM",
  },
  {
    id: 5,
    sender: "them",
    message: "Thank you for listening, it really helps",
    time: "10:40 AM",
  },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0])
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [showChatList, setShowChatList] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      message: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Anonymous Chat</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          Connect with peers in a safe, anonymous environment
        </p>
      </div>

      {/* Safety Notice */}
      <Card className="p-3 sm:p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-2 sm:gap-3">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Your Privacy is Protected</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              All chats are anonymous and encrypted. Your identity is never shared.
            </p>
          </div>
        </div>
      </Card>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Button onClick={() => setShowChatList(!showChatList)} className="lg:hidden mb-2" variant="outline">
          <Menu className="w-4 h-4 mr-2" />
          {showChatList ? "Hide" : "Show"} Chats
        </Button>

        <Card className={`lg:col-span-1 p-3 sm:p-4 ${showChatList ? "block" : "hidden lg:block"}`}>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-foreground text-sm sm:text-base">Active Chats</h2>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                New Chat
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                className="pl-8 sm:pl-10 border-border focus:border-primary text-sm"
              />
            </div>

            <div className="space-y-2">
              {mockChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    setSelectedChat(chat)
                    setShowChatList(false) // Close chat list on mobile when chat is selected
                  }}
                  className={`w-full p-2 sm:p-3 rounded-lg text-left transition-all ${
                    selectedChat.id === chat.id
                      ? "bg-primary/10 border-2 border-primary/30"
                      : "bg-card border border-border hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${chat.online ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className="font-medium text-xs sm:text-sm text-foreground">{chat.name}</span>
                    </div>
                    {chat.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground text-xs">{chat.unread}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-2 flex flex-col h-[500px] sm:h-[600px]">
          {/* Chat Header */}
          <div className="p-3 sm:p-4 border-b border-border">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{selectedChat.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedChat.online ? "Online" : "Offline"}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent text-xs sm:text-sm flex-shrink-0"
              >
                End Chat
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-2 sm:p-3 ${
                    msg.sender === "me" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
                >
                  <p className="text-xs sm:text-sm">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border-border focus:border-primary text-sm"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
