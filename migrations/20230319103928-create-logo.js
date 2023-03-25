"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Logos",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
          type: Sequelize.STRING,
        },
        // fileType: {
        //   type: Sequelize.STRING,
        //   allowNull: false,
        // },
        file: {
          type: Sequelize.BLOB("medium"),
          allowNull: false,
        },
        CompanyId: {
          type: Sequelize.UUID,
          allowNull: false,
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
          uploadedFile: {
            fields: ["CompanyId", "file"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Logos");
  },
};
