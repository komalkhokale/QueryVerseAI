import { initializeSocketConnection } from "../services/chat.socket";
import {
  sendMessage,
  createChat,
  getChats,
  getMessages,
  deleteChat,
} from "../services/chat.api";
import {
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessages,
  updateLastAIMessage,
  removeChat
} from "../chat.slice";

import { useDispatch } from "react-redux";
import { generateImage } from "../services/image.api";
import { analyzeImage } from "../services/image.api";

export const useChat = () => {

    const dispatch = useDispatch()


async function handleSendMessage({ message, chatId }) {
  dispatch(setLoading(true));

  try {
    let currentChatId = chatId;

    // Create new chat if needed
    if (!currentChatId) {
      const data = await createChat(message);

      dispatch(
        createNewChat({
          chatId: data.chat._id,
          title: data.chat.title,
        })
      );

      currentChatId = data.chat._id;

      dispatch(setCurrentChatId(currentChatId));
    }

    // User message
    dispatch(
      addNewMessage({
        chatId: currentChatId,
        content: message,
        role: "user",
      })
    );

    // AI Loading
    dispatch(
      addNewMessage({
        chatId: currentChatId,
        content: "",
        role: "assistant",
        loading: true,
      })
    );

    // AI Response
    const response = await sendMessage({
      message,
      chatId: currentChatId,
    });

    dispatch(
      updateLastAIMessage({
        chatId: currentChatId,
        content: response.aiMessage.content,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(setError("Something went wrong"));
  } finally {
    dispatch(setLoading(false));
  }
}

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[ chat._id ] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }

    async function handleOpenChat(chatId, chats) {

        console.log(chats[ chatId ]?.messages.length)

        if (chats[ chatId ]?.messages.length === 0) {
            const data = await getMessages(chatId)
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role,
            }))

            dispatch(addMessages({
                chatId,
                messages: formattedMessages,
            }))
        }
        dispatch(setCurrentChatId(chatId))
    }

    function handleNewChat() {

    dispatch(setCurrentChatId(null));

}

async function handleGenerateImage({ prompt, chatId }) {
  dispatch(setLoading(true));

  try {
    let currentChatId = chatId;

    // Agar new chat hai to pehle chat create karo
    if (!currentChatId) {
      const data = await createChat(prompt);

      dispatch(
        createNewChat({
          chatId: data.chat._id,
          title: data.chat.title,
        })
      );

      currentChatId = data.chat._id;

      dispatch(setCurrentChatId(currentChatId));
    }

    // User prompt
    dispatch(
      addNewMessage({
        chatId: currentChatId,
        content: prompt,
        role: "user",
      })
    );

    // Loading message
    dispatch(
      addNewMessage({
        chatId: currentChatId,
        content: "Generating image...",
        role: "assistant",
        loading: true,
      })
    );

    // API call
    const data = await generateImage(prompt);

    dispatch(
      updateLastAIMessage({
        chatId: currentChatId,
        content: data.image,
        isImage: true,
      })
    );
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
}

async function handleAnalyzeImage({ image, prompt, chatId }) {
  dispatch(setLoading(true));

  try {
    let currentChatId = chatId;

    // New chat create karo
    if (!currentChatId) {
      const data = await createChat(prompt || "Image Analysis");

      dispatch(
        createNewChat({
          chatId: data.chat._id,
          title: data.chat.title,
        })
      );

      currentChatId = data.chat._id;

      dispatch(setCurrentChatId(currentChatId));
    }

    // User message
    dispatch(
      addNewMessage({
        chatId: currentChatId,
        content: prompt || "Analyze this image",
        role: "user",
      })
    );

    // Loading
    dispatch(
      addNewMessage({
        chatId: currentChatId,
        content: "",
        role: "assistant",
        loading: true,
      })
    );

    const formData = new FormData();

    formData.append("image", image);
    formData.append("prompt", prompt);

    const data = await analyzeImage(formData);

    dispatch(
      updateLastAIMessage({
        chatId: currentChatId,
        content: data.result,
      })
    );

  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoading(false));
  }
}

async function handleDeleteChat(chatId) {
  try {
    await deleteChat(chatId);

    dispatch(removeChat(chatId));
    dispatch(setCurrentChatId(null));
  } catch (err) {
    console.log(err);
  }
}

    return {
    initializeSocketConnection,
    handleSendMessage,
    handleGenerateImage,
    handleAnalyzeImage,
    handleGetChats,
    handleOpenChat,
    handleNewChat,
    handleDeleteChat
}

}

