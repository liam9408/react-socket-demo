import { Model, DataTypes } from "sequelize";
import Rooms from "./rooms.js";

// const { Model, DataTypes } = require("sequelize");
// const Rooms = require("./rooms");

class Message extends Model {
  static initModel(sequelize) {
    Message.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        roomId: {
          type: DataTypes.INTEGER,
          references: {
            model: "rooms",
            key: "id",
          },
        },
        sender: {
          type: DataTypes.TEXT,
        },
        message: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: "message",
      }
    );
  }

  static initAssociation() {
    this.belongsTo(Rooms);
  }
}

export default Message;

// module.exports = Message;
