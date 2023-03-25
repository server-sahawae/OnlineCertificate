"use strict";
const fs = require("fs");
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(
      fs.readFileSync("./data/data.json", "utf-8")
    ).event.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Events", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events");
  },
};
