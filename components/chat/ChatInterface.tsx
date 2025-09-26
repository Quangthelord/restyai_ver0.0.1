"use client";

import { useState, useRef, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { ChatMessage } from "@/types";
import {
  Send,
  Bot,
  User,
  Loader2,
  Calendar,
  Users,
  BarChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const suggestedQuestions = [
  {
    icon: Calendar,
    text: "Create a schedule for next week",
    category: "scheduling",
  },
  {
    icon: Users,
    text: "How many bartenders are available this weekend?",
    category: "staff",
  },
  {
    icon: BarChart,
    text: "Show me this week's wage costs",
    category: "analytics",
  },
  {
    icon: Calendar,
    text: "Schedule 3 waiters for Friday evening",
    category: "scheduling",
  },
];

export function ChatInterface() {
  const { chatMessages, addChatMessage } = useStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSubmit = async (message?: string) => {
    const messageText = message || input.trim();
    if (!messageText || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };
    addChatMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate AI response (in production, this would call your AI service)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(messageText),
        timestamp: new Date(),
        metadata: {
          type: detectMessageType(messageText),
        },
      };
      addChatMessage(aiResponse);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      addChatMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const detectMessageType = (
    message: string
  ): "schedule" | "staff" | "analytics" | "general" => {
    const lower = message.toLowerCase();
    if (
      lower.includes("schedule") ||
      lower.includes("shift") ||
      lower.includes("assign")
    ) {
      return "schedule";
    }
    if (
      lower.includes("staff") ||
      lower.includes("employee") ||
      lower.includes("waiter") ||
      lower.includes("bartender")
    ) {
      return "staff";
    }
    if (
      lower.includes("cost") ||
      lower.includes("wage") ||
      lower.includes("performance") ||
      lower.includes("analytics")
    ) {
      return "analytics";
    }
    return "general";
  };

  const generateMockResponse = (input: string): string => {
    const type = detectMessageType(input);

    const responses = {
      schedule: [
        "I'll help you create an optimized schedule. Based on your current staff availability, I can schedule 3 waiters for Friday evening. Would you like me to assign specific staff members?",
        "I've analyzed your scheduling needs. For next week, I recommend scheduling 2 bartenders and 4 waiters for peak hours. Shall I create the detailed schedule?",
        "Looking at your shift requirements, I can optimize the schedule to reduce overtime costs by 15% while maintaining full coverage.",
      ],
      staff: [
        "Currently, you have 5 bartenders available this weekend. 3 are available for evening shifts and 2 for afternoon shifts. Would you like to see their detailed availability?",
        "I found 8 active staff members in your system. 3 waiters, 2 bartenders, 2 cooks, and 1 host. Would you like me to show their performance metrics?",
        "Your staff utilization is at 78% this week. I recommend adding one more part-time waiter to improve coverage during peak hours.",
      ],
      analytics: [
        "This week's total wage cost is $2,847. This is 12% higher than last week due to overtime. I recommend adjusting the schedule to reduce overtime costs.",
        "Your team's average performance score is 8.3/10 this month. Top performer: Sarah (Bartender) with 9.2/10. Would you like detailed performance insights?",
        "Shift fulfillment rate is currently 94%. You're missing coverage for 2 morning shifts this week. Shall I suggest available staff?",
      ],
      general: [
        "I'm here to help you manage your restaurant staff and scheduling. You can ask me about creating schedules, managing staff, or viewing analytics. What would you like to know?",
        "I can help you with staff scheduling, performance tracking, and cost optimization. Try asking me something like 'How many waiters do I need for Saturday?'",
        "As your AI assistant, I can analyze your staff data and provide recommendations. Would you like to see your current staff overview or schedule insights?",
      ],
    };

    const typeResponses = responses[type] || responses.general;
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
  };

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-6">
              <Bot className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Welcome to RestyAI Assistant
              </h3>
              <p className="text-gray-600 max-w-md">
                I'm here to help you manage your restaurant staff and
                scheduling. Ask me anything about your team, schedules, or
                performance analytics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
              {suggestedQuestions.map((question, index) => {
                const Icon = question.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSubmit(question.text)}
                    className="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {question.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "flex max-w-[80%] rounded-lg p-4",
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  )}
                >
                  <div className="mr-3 flex-shrink-0">
                    {message.role === "user" ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p
                      className={cn(
                        "text-xs mt-2",
                        message.role === "user"
                          ? "text-blue-100"
                          : "text-gray-500"
                      )}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex bg-gray-100 rounded-lg p-4">
                  <Bot className="h-5 w-5 text-blue-600 mr-3" />
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex space-x-4"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about staff scheduling, performance, or analytics..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
