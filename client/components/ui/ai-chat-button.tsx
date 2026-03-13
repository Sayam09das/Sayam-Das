"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Briefcase, MessageSquare, Send, Sparkles, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const SUGGESTED_PROMPTS = [
  "What services do you offer?",
  "Show me your best projects",
  "Are you available for work?",
];

const RESPONSES: Array<{ match: string[]; reply: string }> = [
  {
    match: ["service", "offer", "work on", "help"],
    reply:
      "I build modern web products with Next.js, React, TypeScript, backend APIs, and AI-powered features. That includes portfolio sites, SaaS dashboards, automation flows, and product UI systems.",
  },
  {
    match: ["project", "portfolio", "best", "build"],
    reply:
      "You can explore projects across AI apps, modern frontend systems, and full-stack products. The portfolio sections highlight featured builds with design, engineering, and delivery focus.",
  },
  {
    match: ["available", "hire", "job", "freelance", "contact"],
    reply:
      "Yes. I am open to freelance work, contract roles, and full-time opportunities. Use the contact section and I can respond with project scope, timeline, and availability.",
  },
  {
    match: ["skill", "stack", "tech", "technology"],
    reply:
      "My core stack includes Next.js, React, TypeScript, Node.js, UI engineering, API integration, and product-focused frontend architecture. I also work with AI workflows and automation features.",
  },
];

const DEFAULT_REPLY =
  "Ask about services, projects, skills, or availability. I can guide visitors through the portfolio like a focused product assistant.";

export function AIChatButton({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "I am the portfolio assistant. Ask about services, projects, stack, or availability.",
    },
  ]);
  const chatRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(
    () => [
      { label: "Replies", value: "< 1 min" },
      { label: "Focus", value: "AI + Web" },
      { label: "Mode", value: "Available" },
    ],
    [],
  );

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const buildReply = (question: string) => {
    const normalized = question.toLowerCase();
    const match = RESPONSES.find((item) =>
      item.match.some((keyword) => normalized.includes(keyword)),
    );
    return match?.reply ?? DEFAULT_REPLY;
  };

  const pushQuestion = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsLoading(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: buildReply(trimmed) },
      ]);
      setIsLoading(false);
    }, 650);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void pushQuestion(input);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-[1001] flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-white/20 bg-[linear-gradient(135deg,#08111f_0%,#12304a_52%,#1e6e79_100%)] text-white shadow-[0_22px_60px_rgba(6,16,30,0.38)] backdrop-blur-xl transition-transform duration-300 hover:scale-[1.03]",
          className,
        )}
        whileTap={{ scale: 0.96 }}
        aria-label="Open AI assistant"
      >
        <div className="absolute inset-[1px] rounded-[1.3rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_55%)]" />
        <Bot className="relative h-7 w-7" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close AI assistant overlay"
              className="fixed inset-0 z-[1001] bg-slate-950/28 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.section
              initial={{ opacity: 0, x: 28, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 28, y: 16 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="fixed bottom-6 right-6 z-[1002] flex h-[min(78vh,720px)] w-[min(calc(100vw-24px),420px)] flex-col overflow-hidden rounded-[2rem] border border-white/16 bg-[linear-gradient(180deg,rgba(9,17,29,0.96)_0%,rgba(10,22,38,0.98)_100%)] text-slate-50 shadow-[0_36px_90px_rgba(2,6,23,0.48)] sm:w-[420px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(88,196,190,0.16),transparent_28%),radial-gradient(circle_at_top_left,rgba(106,164,255,0.16),transparent_32%)]" />

              <div className="relative border-b border-white/10 px-5 pb-5 pt-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 shadow-inner shadow-white/10">
                      <Sparkles className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/72">
                        AI Assistant
                      </p>
                      <h3 className="mt-1 font-['Bricolage_Grotesque'] text-xl font-semibold text-white">
                        Sayam System
                      </h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/6 p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Close AI assistant"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-4 max-w-[32ch] text-sm leading-6 text-slate-300">
                  A guided portfolio assistant with quick answers about services, projects, and hiring availability.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/8 bg-white/[0.045] px-3 py-3"
                    >
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt, index) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void pushQuestion(prompt)}
                      className={cn(
                        "rounded-full border px-3 py-2 text-left text-xs font-medium transition-colors",
                        index === 0
                          ? "border-cyan-300/30 bg-cyan-300/12 text-cyan-100 hover:bg-cyan-300/18"
                          : "border-white/10 bg-white/6 text-slate-200 hover:bg-white/10",
                      )}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div
                ref={chatRef}
                className="relative flex-1 space-y-4 overflow-y-auto px-5 py-5"
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={`${message.role}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex w-full",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "flex max-w-[87%] items-start gap-3 rounded-[1.4rem] px-4 py-3 text-sm leading-6 shadow-[0_12px_30px_rgba(2,6,23,0.16)]",
                        message.role === "user"
                          ? "bg-[linear-gradient(135deg,#2a6af1_0%,#3bb7b1_100%)] text-white"
                          : "border border-white/8 bg-white/[0.055] text-slate-100",
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          message.role === "user"
                            ? "bg-white/16"
                            : "bg-cyan-300/14 text-cyan-200",
                        )}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-3 rounded-[1.4rem] border border-white/8 bg-white/[0.055] px-4 py-3 text-sm text-slate-300">
                      <Briefcase className="h-4 w-4 text-cyan-200" />
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-200 [animation-delay:-0.2s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-200 [animation-delay:-0.1s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-200" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="relative border-t border-white/10 bg-slate-950/26 p-4">
                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-2 shadow-inner shadow-white/5">
                  <div className="flex items-end gap-2">
                    <textarea
                      rows={1}
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about projects, services, or availability"
                      className="min-h-[54px] flex-1 resize-none bg-transparent px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-400"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => void pushQuestion(input)}
                      disabled={!input.trim() || isLoading}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2a6af1_0%,#3bb7b1_100%)] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
