"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("messages", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      roomId: {
        type: Sequelize.INTEGER,
        references: {
          model: "rooms",
          key: "id",
        },
      },
      sender: { type: Sequelize.TEXT },
      message: { type: Sequelize.TEXT },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("messages");
  },
};
