"use strict";
const fs = require("fs");
const sharp = require("sharp");
module.exports = {
  async up(queryInterface, Sequelize) {
    let result = fs.readFileSync("./data/logo.json", "utf-8");
    result = await JSON.parse(result);
    const data = await Promise.all(
      result.map(async (el) => {
        console.log(el.name);
        el.createdAt = new Date();
        el.updatedAt = new Date();
        el.file = await sharp(Buffer.from(el.file)).toFormat("webp").toBuffer();
        return el;
      })
    );

    await queryInterface.bulkInsert("Logos", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Logos");
  },
};
