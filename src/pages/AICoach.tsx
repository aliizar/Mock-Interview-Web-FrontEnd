import {
    ArrowUp,
    Bot,
    ChevronLeft,
    ChevronRight,
    Loader2,
    MessageSquare,
    MoreHorizontal,
    Plus,
    Sparkles,
    Trash2,
    User,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
    deleteConversation,
    getChatHistory,
    getConversation,
    sendMessage,

} from "../api/chatbot.api";
import type { ChatConversation } from "../api/chatbot.api";
interface Message {
    id: string;
    role: "USER" | "ASSISTANT";
    content: string;
}

export default function AICoach() {
    const [conversations, setConversations] = useState<ChatConversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<
        number | null
    >(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const [isLoadingConversation, setIsLoadingConversation] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [error, setError] = useState("");

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);



    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth",
            });
        }, 50);
    };

    const loadHistory = async () => {
        try {
            setIsLoadingHistory(true);
            setError("");

            const history = await getChatHistory();

            setConversations(history);
        } catch (error) {
            console.error("Failed to load chat history:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load chat history",
            );
        } finally {
            setIsLoadingHistory(false);
        }
    };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            void loadHistory();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isSending]);
    const loadConversation = async (conversationId: number) => {
        if (isSending || conversationId === activeConversationId) {
            return;
        }

        try {
            setIsLoadingConversation(true);
            setError("");

            const conversation = await getConversation(conversationId);

            setActiveConversationId(conversation.id);

            setMessages(
                conversation.messages.map((message) => ({
                    id: message.id.toString(),
                    role: message.role,
                    content: message.content,
                })),
            );

            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        } catch (error) {
            console.error("Failed to load conversation:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load conversation",
            );
        } finally {
            setIsLoadingConversation(false);
        }
    };

    const startNewChat = () => {
        if (isSending) {
            return;
        }

        setActiveConversationId(null);
        setMessages([]);
        setInput("");
        setError("");

        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }

        setTimeout(() => {
            textareaRef.current?.focus();
        }, 100);
    };

    const handleDeleteConversation = async (
        event: React.MouseEvent,
        conversationId: number,
    ) => {
        event.stopPropagation();

        if (isSending) {
            return;
        }

        try {
            setError("");

            await deleteConversation(conversationId);

            setConversations((prev) =>
                prev.filter((conversation) => conversation.id !== conversationId),
            );

            if (activeConversationId === conversationId) {
                setActiveConversationId(null);
                setMessages([]);
                setInput("");
            }
        } catch (error) {
            console.error("Failed to delete conversation:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete conversation",
            );
        }
    };

    const handleSend = async () => {
        const trimmedMessage = input.trim();

        if (!trimmedMessage || isSending) {
            return;
        }

        const temporaryUserMessage: Message = {
            id: `user-${Date.now()}`,
            role: "USER",
            content: trimmedMessage,
        };

        setMessages((prev) => [...prev, temporaryUserMessage]);
        setInput("");
        setError("");
        setIsSending(true);

        try {
            const result = await sendMessage(
                trimmedMessage,
                activeConversationId ?? undefined,
            );

            const assistantMessage: Message = {
                id: `assistant-${Date.now()}`,
                role: "ASSISTANT",
                content: result.reply,
            };

            setMessages((prev) => [...prev, assistantMessage]);

            if (!activeConversationId) {
                setActiveConversationId(result.conversationId);
            }

            await loadHistory();
        } catch (error) {
            console.error("Failed to send message:", error);

            setMessages((prev) =>
                prev.filter((message) => message.id !== temporaryUserMessage.id),
            );

            setInput(trimmedMessage);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to send message",
            );
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const formatConversationTitle = (title: string) => {
        if (title.length <= 38) {
            return title;
        }

        return `${title.slice(0, 38)}...`;
    };

    return (
        <div className="relative flex h-[calc(100vh-2rem)] min-h-[600px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
            {/* Sidebar */}

            <AnimatePresence initial={false}>
                {sidebarOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 280, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{
                            duration: 0.25,
                            ease: "easeInOut",
                        }}
                        className="relative z-20 hidden shrink-0 overflow-hidden border-r border-slate-800 bg-slate-950 md:block"
                    >
                        <div className="flex h-full w-[280px] flex-col">
                            {/* Sidebar header */}

                            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
                                        <Sparkles size={17} />
                                    </div>

                                    <span className="text-sm font-semibold text-white">
                                        AI Coach
                                    </span>
                                </div>

                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-slate-300"
                                    title="Close sidebar"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                            </div>

                            {/* New chat */}

                            <div className="p-3">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={startNewChat}
                                    className="flex w-full items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-indigo-500/40 hover:bg-slate-800"
                                >
                                    <Plus size={17} className="text-indigo-400" />

                                    <span>New Chat</span>
                                </motion.button>
                            </div>

                            {/* History title */}

                            <div className="px-4 pb-2 pt-2">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                    Recent conversations
                                </p>
                            </div>

                            {/* Conversations */}

                            <div className="flex-1 overflow-y-auto px-2 pb-4">
                                {isLoadingHistory ? (
                                    <div className="space-y-2 p-2">
                                        {[1, 2, 3].map((item) => (
                                            <div
                                                key={item}
                                                className="h-11 animate-pulse rounded-xl bg-slate-900"
                                            />
                                        ))}
                                    </div>
                                ) : conversations.length === 0 ? (
                                    <div className="px-4 py-10 text-center">
                                        <MessageSquare
                                            size={24}
                                            className="mx-auto mb-3 text-slate-700"
                                        />

                                        <p className="text-xs text-slate-500">
                                            No conversations yet.
                                        </p>

                                        <p className="mt-1 text-[11px] text-slate-600">
                                            Start a new chat to begin.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {conversations.map((conversation) => {
                                            const isActive =
                                                conversation.id === activeConversationId;

                                            return (
                                                <motion.button
                                                    key={conversation.id}
                                                    whileHover={{ x: 2 }}
                                                    onClick={() =>
                                                        loadConversation(conversation.id)
                                                    }
                                                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${isActive
                                                        ? "bg-indigo-500/10 text-white"
                                                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                                                        }`}
                                                >
                                                    <MessageSquare
                                                        size={16}
                                                        className={
                                                            isActive
                                                                ? "shrink-0 text-indigo-400"
                                                                : "shrink-0 text-slate-600"
                                                        }
                                                    />

                                                    <span className="min-w-0 flex-1 truncate text-xs">
                                                        {formatConversationTitle(
                                                            conversation.title,
                                                        )}
                                                    </span>

                                                    <span
                                                        role="button"
                                                        tabIndex={0}
                                                        onClick={(event) =>
                                                            handleDeleteConversation(
                                                                event,
                                                                conversation.id,
                                                            )
                                                        }
                                                        className="hidden rounded-md p-1.5 text-slate-600 transition hover:bg-slate-800 hover:text-red-400 group-hover:block"
                                                        title="Delete conversation"
                                                    >
                                                        <Trash2 size={14} />
                                                    </span>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main chat */}

            <div className="relative flex min-w-0 flex-1 flex-col bg-slate-950">
                {/* Top bar */}

                <header className="flex h-[65px] shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 backdrop-blur-xl sm:px-6">
                    <div className="flex items-center gap-3">
                        {!sidebarOpen && (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSidebarOpen(true)}
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-slate-300"
                                title="Open sidebar"
                            >
                                <ChevronRight size={18} />
                            </motion.button>
                        )}

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
                            <Bot size={19} />
                        </div>

                        <div>
                            <h1 className="text-sm font-semibold text-white">
                                InterviewAI Coach
                            </h1>

                            <div className="mt-0.5 flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                                <span className="text-[11px] text-slate-500">
                                    AI Interview Assistant
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-800 hover:text-slate-400"
                        title="More"
                    >
                        <MoreHorizontal size={19} />
                    </button>
                </header>

                {/* Messages */}

                <div className="relative flex-1 overflow-y-auto">
                    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
                        {messages.length === 0 && !isLoadingConversation ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex min-h-[calc(100vh-18rem)] flex-col items-center justify-center text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 180,
                                        damping: 15,
                                    }}
                                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-lg shadow-indigo-500/5"
                                >
                                    <Sparkles size={28} />
                                </motion.div>

                                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    How can I help you today?
                                </h2>

                                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                                    Ask me anything about interviews, technical concepts,
                                    resumes, career preparation, or software development.
                                </p>

                                <div className="mt-7 flex flex-wrap justify-center gap-2">
                                    {[
                                        "Prepare me for a React interview",
                                        "Help me improve my communication",
                                        "Explain system design",
                                    ].map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => {
                                                setInput(suggestion);
                                                textareaRef.current?.focus();
                                            }}
                                            className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-400 transition hover:border-indigo-500/30 hover:bg-slate-800 hover:text-slate-200"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : isLoadingConversation ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2
                                    size={22}
                                    className="animate-spin text-indigo-400"
                                />
                            </div>
                        ) : (
                            <div className="space-y-7">
                                <AnimatePresence initial={false}>
                                    {messages.map((message) => {
                                        const isUser = message.role === "USER";

                                        return (
                                            <motion.div
                                                key={message.id}
                                                initial={{
                                                    opacity: 0,
                                                    y: 18,
                                                    scale: 0.98,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "easeOut",
                                                }}
                                                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"
                                                    }`}
                                            >
                                                {!isUser && (
                                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
                                                        <Sparkles size={15} />
                                                    </div>
                                                )}

                                                <div
                                                    className={`max-w-[85%] sm:max-w-[78%] ${isUser ? "order-first" : ""
                                                        }`}
                                                >
                                                    <div
                                                        className={`rounded-2xl px-4 py-3 text-sm leading-6 ${isUser
                                                            ? "rounded-br-md bg-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                                                            : "rounded-bl-md border border-slate-800 bg-slate-900 text-slate-300"
                                                            }`}
                                                    >
                                                        <div className="whitespace-pre-wrap break-words">
                                                            {message.content}
                                                        </div>
                                                    </div>
                                                </div>

                                                {isUser && (
                                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                                                        <User size={15} />
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>

                                {/* AI typing */}

                                <AnimatePresence>
                                    {isSending && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 15,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -5,
                                            }}
                                            className="flex gap-3"
                                        >
                                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
                                                <Sparkles size={15} />
                                            </div>

                                            <div className="rounded-2xl rounded-bl-md border border-slate-800 bg-slate-900 px-4 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <motion.span
                                                        animate={{ y: [0, -4, 0] }}
                                                        transition={{
                                                            duration: 0.7,
                                                            repeat: Infinity,
                                                            delay: 0,
                                                        }}
                                                        className="h-1.5 w-1.5 rounded-full bg-slate-500"
                                                    />

                                                    <motion.span
                                                        animate={{ y: [0, -4, 0] }}
                                                        transition={{
                                                            duration: 0.7,
                                                            repeat: Infinity,
                                                            delay: 0.15,
                                                        }}
                                                        className="h-1.5 w-1.5 rounded-full bg-slate-500"
                                                    />

                                                    <motion.span
                                                        animate={{ y: [0, -4, 0] }}
                                                        transition={{
                                                            duration: 0.7,
                                                            repeat: Infinity,
                                                            delay: 0.3,
                                                        }}
                                                        className="h-1.5 w-1.5 rounded-full bg-slate-500"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Error */}

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-24 left-1/2 z-10 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-red-500/20 bg-slate-900 px-4 py-3 text-center text-xs text-red-400 shadow-xl"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Input */}

                <div className="shrink-0 border-t border-slate-800 bg-slate-950 px-4 pb-4 pt-3 sm:px-6">
                    <div className="mx-auto max-w-3xl">
                        <motion.div
                            animate={{
                                boxShadow: isSending
                                    ? "0 0 0 1px rgba(99, 102, 241, 0.2)"
                                    : "0 0 0 0px rgba(99, 102, 241, 0)",
                            }}
                            className="relative flex items-end rounded-2xl border border-slate-800 bg-slate-900 p-2 transition-colors focus-within:border-indigo-500/40"
                        >
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isSending}
                                rows={1}
                                placeholder="Message InterviewAI..."
                                className="max-h-32 min-h-[42px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-5 text-white outline-none placeholder:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                            />

                            <motion.button
                                whileHover={{
                                    scale: input.trim() && !isSending ? 1.05 : 1,
                                }}
                                whileTap={{
                                    scale: input.trim() && !isSending ? 0.92 : 1,
                                }}
                                onClick={handleSend}
                                disabled={!input.trim() || isSending}
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${input.trim() && !isSending
                                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-600"
                                    : "cursor-not-allowed bg-slate-800 text-slate-600"
                                    }`}
                                title="Send message"
                            >
                                {isSending ? (
                                    <Loader2 size={17} className="animate-spin" />
                                ) : (
                                    <ArrowUp size={18} />
                                )}
                            </motion.button>
                        </motion.div>

                        <p className="mt-2 text-center text-[10px] text-slate-600">
                            AI can make mistakes. Verify important information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}