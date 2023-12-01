import RoomModel from '../db/models/rooms.js';

class RoomService {
  constructor() {
    this.roomModel = RoomModel;
  }

  async getRoomByName(roomName) {
    try {
      const room = await this.roomModel.findOne({
        where: {
          name: roomName,
        },
      });

      if (!room) return null;
      return room.toJSON();
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  async createRoom(roomName) {
    try {
      const newRoom = await this.roomModel.create({ name: roomName });
      return newRoom.toJSON();
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}

export default RoomService;

// module.exports = RoomService;
