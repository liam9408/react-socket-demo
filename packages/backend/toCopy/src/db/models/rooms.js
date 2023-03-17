import { Model, DataTypes } from "sequelize";
import Messages from "./messages.js";

class Room extends Model {
  static initModel(sequelize) {
    Room.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: "room",
      }
    );
  }

  static initAssociation() {
    this.hasMany(Messages);
  }
}

export default Room;
