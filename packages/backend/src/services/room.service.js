import RoomModel from "../db/models/rooms.js";

// const RoomModel = require("../db/models/rooms.js");

class RoomService {
  async getRoomByName(roomName) {
    try {
      const room = await RoomModel.findOne({
        where: {
          name: roomName,
        },
      });

      if (!room) return null;
      return room.toJSON();
    } catch (err) {
      console.error(err);
    }
  }

  async createRoom(roomName) {
    try {
      const newRoom = await RoomModel.create({ name: roomName });
      return newRoom.toJSON();
    } catch (err) {
      console.error(err);
    }
  }
}

export default RoomService;

// module.exports = RoomService;
