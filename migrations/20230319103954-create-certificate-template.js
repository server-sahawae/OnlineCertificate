"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CertificateTemplates", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      file: {
        type: Sequelize.BLOB("medium"),
        allowNull: false,
      },
      namePosition: {
        type: Sequelize.FLOAT,
      },
      statusPosition: {
        type: Sequelize.FLOAT,
      },

      QRx: {
        type: Sequelize.FLOAT,
      },
      QRy: {
        type: Sequelize.FLOAT,
      },
      signName: { type: Sequelize.STRING },
      LogoId: { type: Sequelize.UUID, references: { model: "Logos" } },

      EventId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Events" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("CertificateTemplates");
  },
};
