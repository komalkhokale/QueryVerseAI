// // import React, { useEffect } from 'react'
// // import { useSelector } from 'react-redux'

// // import { useChat } from '../hooks/useChat'

// // const Dashboard = () => {

// //   const chat = useChat()

// //     const {user} = useSelector(state => state.auth  )

// //     console.log(user)

// //     useEffect(() => {
// //       chat.initializeSocketConnection()
// //     },[])

// //   return (
// //     <main className='h-screen w-full flex bg-neutral-800 test-white'>

// //     </main>
// //   )
// // }

// // export default Dashboard

// import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { useSelector } from "react-redux";
// import { useChat } from "../hooks/useChat";
// import remarkGfm from "remark-gfm";

// const Dashboard = () => {
//   const chat = useChat();
//   const [chatInput, setChatInput] = useState("");
//   const chats = useSelector((state) => state.chat.chats);
//   const currentChatId = useSelector((state) => state.chat.currentChatId);

//   useEffect(() => {
//     chat.initializeSocketConnection();
//     chat.handleGetChats();
//   }, []);

//   const handleSubmitMessage = (event) => {
//     event.preventDefault();

//     const trimmedMessage = chatInput.trim();
//     if (!trimmedMessage) {
//       return;
//     }

//     chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
//     setChatInput("");
//   };

//   const openChat = (chatId) => {
//     chat.handleOpenChat(chatId, chats);
//   };

//   return (
//     <main className="min-h-screen w-full bg-[#07090f] p-3 text-white md:p-5">
//       <section className="mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border   p-1 md:h-[calc(100vh-2.5rem)] md:gap-6 md:p-1 border-none">
//         <aside className="hidden h-full w-72 shrink-0 rounded-3xl border  bg-[#080b12] p-4 md:flex md:flex-col">
//           <h1 className="mb-5 text-3xl font-semibold tracking-tight">
//             Perplexity
//           </h1>

//           <div className="space-y-2">
//             {Object.values(chats).map((chat, index) => (
//               <button
//                 onClick={() => {
//                   openChat(chat.id);
//                 }}
//                 key={index}
//                 type="button"
//                 className="w-full cursor-pointer rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white"
//               >
//                 {chat.title}
//               </button>
//             ))}
//           </div>
//         </aside>

//         <section className="relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4">
//           <div className="messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30">
//             {chats[currentChatId]?.messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
//                   message.role === "user"
//                     ? "ml-auto rounded-br-none bg-white/12 text-white"
//                     : "mr-auto border-none text-white/90"
//                 }`}
//               >
//                 {message.role === "user" ? (
//                   <p>{message.content}</p>
//                 ) : (
//                   <ReactMarkdown
//                     components={{
//                       p: ({ children }) => (
//                         <p className="mb-2 last:mb-0">{children}</p>
//                       ),
//                       ul: ({ children }) => (
//                         <ul className="mb-2 list-disc pl-5">{children}</ul>
//                       ),
//                       ol: ({ children }) => (
//                         <ol className="mb-2 list-decimal pl-5">{children}</ol>
//                       ),
//                       code: ({ children }) => (
//                         <code className="rounded bg-white/10 px-1 py-0.5">
//                           {children}
//                         </code>
//                       ),
//                       pre: ({ children }) => (
//                         <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">
//                           {children}
//                         </pre>
//                       ),
//                     }}
//                     remarkPlugins={[remarkGfm]}
//                   >
//                     {message.content}
//                   </ReactMarkdown>
//                 )}
//               </div>
//             ))}
//           </div>

//           <footer className="rounded-3xl w-full absolute bottom-2 border border-white/60 bg-[#080b12] p-4 md:p-5">
//             <form
//               onSubmit={handleSubmitMessage}
//               className="flex flex-col gap-3 md:flex-row"
//             >
//               <input
//                 type="text"
//                 value={chatInput}
//                 onChange={(event) => setChatInput(event.target.value)}
//                 placeholder="Type your message..."
//                 className="w-full rounded-2xl border border-white/50 bg-transparent px-4 py-3 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90"
//               />
//               <button
//                 type="submit"
//                 disabled={!chatInput.trim()}
//                 className="rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 Send
//               </button>
//             </form>
//           </footer>
//         </section>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
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

const Dashboard = () => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleSubmitMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) {
      return;
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
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
              Perplexity
            </h1>
          </div>

          {/* new chat button */}
          <button
            type="button"
            className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>

          {/* chat list */}
          <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
            {Object.values(chats).map((c, index) => {
              const isActive = c.id === currentChatId;
              return (
                <button
                  onClick={() => openChat(c.id)}
                  key={index}
                  type="button"
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <MessageSquare className="h-4 w-4 shrink-0 opacity-60" />
                  <span className="truncate">{c.title}</span>
                </button>
              );
            })}
          </div>

          {/* bottom: logout only */}
          <div className="mt-4 border-t border-white/10 pt-4">
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CHAT AREA */}
        <section className="relative mx-auto flex h-full min-w-0 max-w-3xl flex-1 flex-col">
          <div className="messages flex-1 space-y-4 overflow-y-auto px-1 pb-32 pt-2">
            {chats[currentChatId]?.messages.map((message) => {
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
                    ) : (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-2 list-disc pl-5">{children}</ul>
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
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* INPUT BAR */}
          <footer className="absolute bottom-2 w-full rounded-3xl border border-white/10 bg-[#0b0d14]/90 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-4">
            <form
              onSubmit={handleSubmitMessage}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Type your message..."
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