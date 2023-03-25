"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "EventLogos",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        LogoId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Logos" },
        },
        EventId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "Events" },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          EventLogo: {
            fields: ["EventId", "LogoId"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EventLogos");
  },
};
