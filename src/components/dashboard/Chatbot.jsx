"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Next.js 13+ hooks for routing
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FcLightAtTheEndOfTunnel, FcReadingEbook } from "react-icons/fc";
import ReactMarkdown from "react-markdown";
import chatbotService from "@/services/chatbotService";
import { AppContext } from "@/context/AppContext";
import { userValidation } from "@/hooks/validation";
import ChatLoader from "../loaders/ChatLoader";
import ExportButtons from "./ExportButtons";

export default function Chatbot() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { assistantId, user, setActiveSession, promptChain, userProfile } =
    useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [chatTitle, setChatTitle] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLoader, setChatLoader] = useState(true);
  const userCredits = 19;
  const sessionId = searchParams.get("s");

  const handleFetchChat = async (sessionId) => {
    if (!sessionId) {
      setMessages([]); // clear old messages
      setChatLoader(false); // stop loader manually
      return;
    }

    await chatbotService.fetchChat(
      assistantId,
      user.email,
      sessionId,
      setMessages,
      setChatTitle,
      setChatLoader,
    );
  };

  userValidation();

  const justSentRef = useRef(false);

  useEffect(() => {
    if (user) {
      setActiveSession(sessionId);

      if (sessionId && !justSentRef.current) {
        setMessages([]);
        handleFetchChat(sessionId);
      } else if (!sessionId && !justSentRef.current) {
        setMessages([]); // ✅ Clear on fresh chat navigation
        setChatLoader(false);
      }

      justSentRef.current = false;
    }
  }, [user, sessionId]);

  // When sending first message, if no sessionId, generate and push to URL
  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!sessionId) {
      const newSessionId =
        Date.now().toString() + Math.floor(Math.random() * 1000).toString();

      await chatbotService.sendMessage(
        chatTitle,
        input,
        messages,
        setMessages,
        setInput,
        setLoading,
        user.email,
        userCredits,
        newSessionId,
        assistantId,
        promptChain,
        userProfile,
      );
      justSentRef.current = true;
      // ✅ Push to URL only after message is sent and saved
      router.replace(`/chat?s=${newSessionId}`, { scroll: false });
      setActiveSession(newSessionId); // also update context if needed
    } else {
      await chatbotService.sendMessage(
        chatTitle,
        input,
        messages,
        setMessages,
        setInput,
        setLoading,
        user.email,
        userCredits,
        sessionId,
        assistantId,
        promptChain,
        userProfile,
      );
    }
  };

  const isEmpty = messages.length === 0;

  if (chatLoader) {
    return <ChatLoader />;
  }

  return (
    <div className="flex h-screen w-full flex-col bg-white text-black">
      {isEmpty ? (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-indigo-50 px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-5xl"
          >
            {/* Heading */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Your Personal AI Assistant
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Ask anything. Get instant answers. Smart, simple, and always
                available.
              </p>
            </div>

            {/* Input Row */}
            <div className="flex flex-col md:flex-row">
              {/* Chat Title */}
              <div className="flex flex-1 flex-col">
                <label
                  htmlFor="chatTitle"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Chat Title
                </label>
                <input
                  id="chatTitle"
                  type="text"
                  value={chatTitle}
                  onChange={(e) => setChatTitle(e.target.value)}
                  placeholder="e.g., My Research Chat"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Helps you organize and revisit your chats later.
                </p>
              </div>

              {/* User Question */}
              <div className="relative ml-0 mt-8 flex flex-1 flex-col md:ml-8 md:mt-0">
                <label
                  htmlFor="userQuestion"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Your Question
                </label>
                <input
                  id="userQuestion"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your question here..."
                  className="rounded-lg border border-gray-300 bg-white px-5 py-3 pr-14 text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={sendMessage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-indigo-600 p-1.5 text-white transition hover:bg-indigo-700"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 text-center text-sm text-gray-400">
              ⚡ Powered by{" "}
              <span className="font-semibold text-indigo-600">Kreatebots</span>{" "}
              · 100% Private & Secure
            </div>
          </motion.div>
        </div>
      ) : (
        <>
          {/* chat messages list */}
          <div className="w-full flex-1 overflow-y-auto pt-16">
            {messages.map((msg, index) => (
              // your existing message rendering
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex w-full items-start gap-4 pb-6 pr-2 pt-6 lg:pl-24 lg:pr-20 ${
                  msg.sender === "user" ? "bg-gray-100" : "bg-gray-10"
                }`}
              >
                {msg.sender === "bot" ? (
                  <FcLightAtTheEndOfTunnel className="flex-shrink-0 text-2xl" />
                ) : (
                  <FcReadingEbook className="flex-shrink-0 text-2xl" />
                )}
                <div className="w-full">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                  {msg.sender === "bot" && index > 0 && (
                    <>
                      <ExportButtons msg={msg} title={chatTitle} />
                    </>
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-10 flex w-full items-start gap-4 pb-6 pl-2 pr-2 pt-6 lg:pl-24 lg:pr-24"
              >
                <FcLightAtTheEndOfTunnel className="flex-shrink-0 text-2xl" />
                <span className="mt-2 flex space-x-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 delay-200"></span>
                  <span className="delay-400 h-2 w-2 animate-bounce rounded-full bg-gray-500"></span>
                </span>
              </motion.div>
            )}
          </div>
          <div className="flex flex-col items-center border-t border-gray-200 p-4 pb-6 pl-2 pr-2 lg:pl-24 lg:pr-24">
            <div className="relative w-full">
              <input
                className="w-full rounded-full border border-gray-200 bg-white p-4 pr-12 text-black focus:outline-none focus:ring-0"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600"
              >
                <ArrowRight size={24} />
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              ⚡ Powered by Kreatebots · 100% private & secure
            </div>
          </div>
        </>
      )}
    </div>
  );
}
