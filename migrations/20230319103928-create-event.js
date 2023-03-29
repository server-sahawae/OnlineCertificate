"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
      },

      time: {
        type: Sequelize.DATE,
      },
      duration: {
        type: Sequelize.FLOAT,
        defaultValue: 2,
      },
      description: {
        type: Sequelize.STRING,
      },

      CompanyId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      image: {
        type: Sequelize.BLOB("medium"),
      },
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
    await queryInterface.dropTable("Events");
  },
};
