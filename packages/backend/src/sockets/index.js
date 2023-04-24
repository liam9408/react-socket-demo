import { MessageService, RoomService } from "../services/index.js";

const messageService = new MessageService();
const roomService = new RoomService();

export const initializeSockets = (io) => {
  let arrayOfRooms = [];

  io.on("connection", (socket) => {
    console.log("a user connected to the server");
    console.log("socket id: ", socket.id);

    let chatroom = "room1";

    socket.on("subscribe", async (roomName) => {
      try {
        chatroom = roomName;

        // todo: create room
        let room = await roomService.getRoomByName(roomName);
        console.log({ room, roomName });
        if (!room) {
          room = await roomService.createRoom(roomName);
        }

        const messages = await messageService.listMessagesByRoom(room.id);

        socket.join(roomName);
        console.log("a user has joined our room: " + room);

        arrayOfRooms.push(roomName);
        console.log(arrayOfRooms);

        // todo: send back room and messages object
        // emitting event back to app.js to change room name HTML
        io.to(chatroom).emit("joinRoom", { room, messages });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("a user has abandoned us ...");
    });

    socket.on("unsubscribe", (room) => {
      try {
        console.log("[socket]", "leave room :", room);
        socket.leave(room);
        socket.to(room).emit("user left", socket.id);
      } catch (e) {
        console.log("[error]", "leave room :", e);
        socket.emit("error", "couldnt perform requested action");
      }
    });

    socket.on("chatMessage", async (data) => {
      try {
        const sender = data[1];
        const message = data[0];
        const room = data[2];

        console.log(sender + " says: " + message);

        await messageService.createMessage(room.id, sender, message);
        io.to(chatroom).emit("chatMessage", data);
      } catch (err) {
        console.error(err);
      }
    });
  });
};
