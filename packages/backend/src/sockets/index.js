/* eslint-disable import/prefer-default-export */
import { MessageService, RoomService } from '../services/index.js';

const messageService = new MessageService();
const roomService = new RoomService();

export const initializeSockets = (io) => {
  io.on('connection', (socket) => {
    console.log('a client connected to the server');
    console.log('socket id: ', socket.id); // The purpose of socket.id is to uniquely identify each client that connects to the server. This is useful for when we want to send messages to specific clients / track individual clients.

    let chatroom = 'room1';

    socket.on(
      'subscribe',
      (packet, next) => {
        console.log('packet ', packet);
      },
      async (roomName) => {
        try {
          chatroom = roomName;

          let room = await roomService.getRoomByName(roomName);
          // * create room if it doesn't exist
          if (!room) {
            room = await roomService.createRoom(roomName);
          }

          // check if user has required role here

          const messages = await messageService.listMessagesByRoom(room.id);

          socket.join(roomName);
          console.log(`a user has joined our room: ${room}`);

          // * send back room and messages object
          // emitting event back to app.js to change room name HTML
          io.to(chatroom).emit('joinRoom', { room, messages });
        } catch (err) {
          console.error(err);
        }
      }
    );

    socket.on('disconnect', () => {
      console.log('a user has abandoned us ...');
    });

    socket.on('unsubscribe', (room) => {
      try {
        console.log('[socket]', 'leave room :', room);
        socket.leave(room);
      } catch (e) {
        console.log('[error]', 'leave room :', e);
        socket.emit('error', 'couldnt perform requested action');
      }
    });

    socket.on('chatMessage', async (data) => {
      try {
        const sender = data[1];
        const message = data[0];
        const room = data[2];

        console.log(`${sender} says: ${message}`);

        await messageService.createMessage(room.id, sender, message);
        io.to(chatroom).emit('chatMessage', data);
      } catch (err) {
        console.error(err);
      }
    });
  });
};

/**
 * 1. customer send complaint / question
 * 2. server receive the message
 * 3. pass into the ai chatbot to generate the answer (ie. open ai api ??)
 * 4. save the customer message and the answer into the database
 * 5. return the answer to the customer
 */
