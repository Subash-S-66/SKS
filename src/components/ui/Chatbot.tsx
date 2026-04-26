"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Bot } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
};

const PRESET_QUESTIONS = [
  "What services do you offer?",
  "How can I contact you?",
  "Pricing?",
  "Show portfolio",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi! I'm the SKS assistant. How can I help you today?", sender: "bot" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleQuestionClick = (question: string) => {
    // Add user message
    const userMsg: Message = { id: new Date().getTime().toString(), text: question, sender: "user" };
    setMessages(prev => [...prev, userMsg]);

    // Simulate bot thinking and reply
    setTimeout(() => {
      let reply = "";
      if (question === "What services do you offer?") {
        reply = "I specialize in Business Website Creation, Online Booking Systems, E-commerce, and Customer Management Systems. Scroll up to the Services section to see more!";
      } else if (question === "How can I contact you?") {
        reply = "You can scroll down to the Contact section to send me a direct message, and I'll reply within 24 hours.";
      } else if (question === "Pricing?") {
        reply = "Pricing depends heavily on project scope. High-end, custom development usually starts at a premium tier. Please use the contact form to get a custom quote!";
      } else if (question === "Show portfolio") {
        reply = "I am currently updating my latest top-tier projects. Stay tuned, or reach out directly to see case studies relevant to your industry.";
      } else {
        reply = "I'm just a simple bot, but SKS can answer that for you. Drop a message in the contact form!";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: reply, sender: "bot" }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-brand flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[500px] max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">SKS Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-foreground/50">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-foreground/70" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.sender === 'user' ? 'bg-gradient-brand text-white rounded-br-sm' : 'bg-white/10 text-foreground rounded-bl-sm border border-white/5'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-t border-white/10 bg-black/20">
              <div className="flex flex-wrap gap-2">
                {PRESET_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuestionClick(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
