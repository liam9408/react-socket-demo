import MessageModel from '../db/models/messages.js';

class MessageService {
  constructor() {
    this.messageModel = MessageModel;
  }

  async listMessagesByRoom(roomId) {
    try {
      const messages = await this.messageModel.findAll({
        where: {
          roomId,
        },
      });
      console.log(messages);
      return messages.map((message) => message.toJSON());
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  async createMessage(roomId, sender, message) {
    try {
      const newMessage = await this.messageModel.create({
        roomId,
        sender,
        message,
      });
      return newMessage.toJSON();
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}

export default MessageService;
