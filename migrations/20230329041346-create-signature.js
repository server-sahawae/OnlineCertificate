"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Signatures", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      QRx: {
        type: Sequelize.INTEGER,
      },
      QRy: {
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING },
      LogoId: { type: Sequelize.UUID, references: { model: "Logos" } },
      CertificateTemplateId: {
        type: Sequelize.UUID,
        references: { model: "CertificateTemplates" },
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
    await queryInterface.dropTable("Signatures");
  },
};
