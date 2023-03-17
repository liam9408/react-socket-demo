import MessageModel from "../db/models/messages.js";

class MessageService {
  async listMessagesByRoom(roomId) {
    try {
      const messages = await MessageModel.findAll({
        where: {
          roomId,
        },
      });
      console.log(messages);
      return messages.map((message) => message.toJSON());
    } catch (err) {
      console.error(err);
    }
  }

  async createMessage(roomId, sender, message) {
    try {
      const newMessage = await MessageModel.create({
        roomId,
        sender,
        message,
      });
      return newMessage.toJSON();
    } catch (err) {
      console.error(err);
    }
  }
}

export default MessageService;
