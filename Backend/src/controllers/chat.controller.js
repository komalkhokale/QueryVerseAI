import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

// export async function sendMessage(req, res) {

//   const { message, chat: chatId } = req.body;


// //   let title = null, chat = null;

// //   if (!chatId) {
// //     title = await generateChatTitle(message);

// //     chat = await chatModel.create({
// //       user: req.user.id,
// //       title,
// //     });
// //   }

 

//   const userMessage = await messageModel.create({
//     //   chat: chatId || chat._id,
//     chat: chatId,
//       content: message,
//       role: "user"
//   })


//     //  const messages = await messageModel.find({ chat: chatId || chat._id });
//     const messages = await messageModel.find({
//     chat: chatId
// });

//     const result = await generateResponse(messages);

    
//   const aiMessage = await messageModel.create({
//     //   chat: chatId || chat._id,
//     chat: chatId,   
//       content: result,
//     //   role: "ai"
//     role: "assistant"
//   })

// console.log(messages)

// //   res.status(201).json({
// //      title,
// //      chat,
// //      aiMessage
// //   })

// res.status(201).json({
//     success: true,
//     aiMessage
// });
// }

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;

  await messageModel.create({
    chat: chatId,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({
    chat: chatId,
  });

  const result = await generateResponse(messages);

  const aiMessage = await messageModel.create({
    chat: chatId,
    content: result,
    role: "ai",
  });

  res.status(201).json({
    success: true,
    aiMessage,
  });
}


export async function getChats(req, res) {
    
    const user = req.user

    const chats = await chatModel.find({user:user.id}).sort({createdAt: -1})

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })

}

export async function getMessages(req, res) {
    const {chatId} = req.params;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

        res.status(200).json({
        message: "Message retrieved successfully",
        messages
    })
}

export async function deleteChat(req, res) {
    
    const {chatId} = req.params;

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if(!chat){
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully"
    })

}

export async function createChat(req, res) {
  const { message } = req.body;

  const title = await generateChatTitle(message);

  const chat = await chatModel.create({
    user: req.user.id,
    title,
  });

  res.status(201).json({
    success: true,
    chat,
  });
}