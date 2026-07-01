
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import remarkGfm from "remark-gfm";
import {
  Sparkles,
  MessageSquare,
  Plus,
  SendHorizontal,
  Bot,
  LogOut,
} from "lucide-react";

import { Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hook/useAuth";

import { ImageIcon } from "lucide-react";
import { Download } from "lucide-react";

import { ImagePlus } from "lucide-react";
import { Copy, Check } from "lucide-react";


const Dashboard = () => {
  const chat = useChat();

  const [chatInput, setChatInput] = useState("");
  const [imageMode, setImageMode] = useState(false);

  const [copied, setCopied] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);


const navigate = useNavigate();
const auth = useAuth();

const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setSelectedImage(file);
};

const handleLogout = async () => {
  await auth.handleLogout();
  navigate("/", { replace: true });
};

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const downloadImage = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "AIVerse-Image.png";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl);
  };

  // const handleSubmitMessage = (event) => {
  //   event.preventDefault();

  //   const trimmedMessage = chatInput.trim();
  //   if (!trimmedMessage) {
  //     return;
  //   }

  //   // chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });

  //   if (imageMode) {
  //     // next step
  //   } else {
  //     chat.handleSendMessage({
  //       message: trimmedMessage,
  //       chatId: currentChatId,
  //     });
  //   }
  //   setChatInput("");
  // };

const handleSubmitMessage = async (event) => {
  event.preventDefault();

if (selectedImage) {
  await chat.handleAnalyzeImage({
    image: selectedImage,
    prompt: chatInput,
    chatId: currentChatId,
  });

  setSelectedImage(null);
  setChatInput("");
  return;
}

  const trimmedMessage = chatInput.trim();

  if (!trimmedMessage) return;

  if (imageMode) {
    await chat.handleGenerateImage({
      prompt: trimmedMessage,
      chatId: currentChatId,
    });
  } else {
    await chat.handleSendMessage({
      message: trimmedMessage,
      chatId: currentChatId,
    });
  }

  setChatInput("");
};
  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };



  return (
    <main className="min-h-screen w-full bg-[#07090f] p-3 text-white md:p-5">
      <section className="relative mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 md:h-[calc(100vh-2.5rem)] md:gap-5">
        {/* SINGLE MERGED SIDEBAR */}
        <aside className="hidden h-full w-72 shrink-0 flex-col rounded-3xl border border-white/10 bg-[#0b0d14]/80 p-5 backdrop-blur-xl md:flex">
          {/* logo + title */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-600/20">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-white">
              QueryVerseAI
            </h1>
          </div>

          {/* new chat button */}
          <button
            type="button"
            onClick={chat.handleNewChat}
            className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>

          {/* chat list */}
          <div className="flex-1 space-y-1.5 overflow-y-auto pr-1 scrollbar-hide">
            {Object.values(chats).map((c, index) => {
              const isActive = c.id === currentChatId;
              return (
                <button
                  onClick={() => openChat(c.id)}
                  key={index}
                  type="button"
                  className={`group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <MessageSquare className="h-4 w-4 shrink-0 opacity-60" />
                  <div className="flex w-full items-center justify-between">
                    <span className="truncate">{c.title}</span>

                    <Trash2
                      size={16}
                      onClick={(e) => {
                        e.stopPropagation();
                        chat.handleDeleteChat(c.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-opacity cursor-pointer flex-shrink-0"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* bottom: logout only */}
          <div className="mt-4 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CHAT AREA */}
        <section className="relative mx-auto flex h-full min-w-0 max-w-5xl flex-1 flex-col">
          <div className="messages flex-1 scrollbar-hide space-y-4 overflow-y-auto px-1 pb-32 pt-2">
            {!currentChatId && (
              <div className="flex h-full flex-col items-center justify-center">
                <Sparkles className="h-16 w-16 text-violet-500" />

                <h2 className="mt-6 text-4xl font-bold">
                  Start a New Conversation
                </h2>

                <p className="mt-3 text-zinc-500">
                  Ask anything. AI is ready to help.
                </p>
              </div>
            )}
            {currentChatId &&
              chats[currentChatId]?.messages.map((message, index) => {
                const isUser = message.role === "user";
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}

                    <div
                      className={`w-fit max-w-[82%] rounded-2xl px-4 py-3 text-sm md:text-base ${
                        isUser
                          ? "rounded-br-md bg-white/10 text-white"
                          : "rounded-tl-md border border-white/10 bg-white/[0.03] text-zinc-200"
                      }`}
                    >
                      {isUser ? (
                        <p>{message.content}</p>
                      ) : message.loading ? (
                        <div className="space-y-3 animate-pulse w-[420px]">
                          <div className="h-3 rounded bg-zinc-700"></div>
                          <div className="h-3 w-5/6 rounded bg-zinc-700"></div>
                          <div className="h-3 w-4/6 rounded bg-zinc-700"></div>

                          <p className="mt-3 text-sm text-zinc-400">
                            Generating...
                          </p>
                        </div>
                      ) : message.isImage ? (
                        <div className="space-y-3">
                          <img
                            src={message.content}
                            alt="Generated"
                            className="max-w-md rounded-2xl border border-white/10"
                          />

                          <button
                            onClick={() => downloadImage(message.content)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500"
                          >
                            <Download size={18} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="mb-2 list-disc pl-5">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="mb-2 list-decimal pl-5">
                                  {children}
                                </ol>
                              ),
                              code: ({ children }) => (
                                <code className="rounded bg-white/10 px-1 py-0.5">
                                  {children}
                                </code>
                              ),
                              pre: ({ children }) => (
                                <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">
                                  {children}
                                </pre>
                              ),
                            }}
                            remarkPlugins={[remarkGfm]}
                          >
                            {message.content}
                          </ReactMarkdown>

                          {!isUser && (
                            <div className="mt-3 flex justify-end">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    message.content,
                                  );

                                  setCopied(index);

                                  setTimeout(() => {
                                    setCopied(null);
                                  }, 1500);
                                }}
                                className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
                              >
                                {copied === index ? (
                                  <Check size={16} />
                                ) : (
                                  <Copy size={16} />
                                )}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* INPUT BAR */}
          <footer className="absolute bottom-2 w-full rounded-3xl border border-white/10 bg-[#0b0d14]/90 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-4">
            {imageMode && (
              <div className="mb-3 flex items-center gap-2 rounded-xl bg-violet-600/10 px-3 py-2 text-sm text-violet-300">
                🖼️ Image Generation Mode
              </div>
            )}
            {selectedImage && (
              <div className="mb-3">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="preview"
                  className="h-28 rounded-xl border border-white/10"
                />
              </div>
            )}
            <form
              onSubmit={handleSubmitMessage}
              className="flex items-center gap-2"
            >
              <label className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10">
                <Plus className="h-4 w-4" />

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              <button
                type="button"
                onClick={() => setImageMode(!imageMode)}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                  imageMode
                    ? "bg-violet-600 text-white"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                <ImageIcon size={20} />
              </button>
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder={
                  imageMode
                    ? "Describe the image you want..."
                    : "Type your message..."
                }
                className="w-full flex-1 rounded-2xl bg-transparent px-4 py-3 text-base text-white outline-none placeholder:text-zinc-500 md:text-lg"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/25 transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                <SendHorizontal className="h-5 w-5" />
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  );
};

export default Dashboard; 