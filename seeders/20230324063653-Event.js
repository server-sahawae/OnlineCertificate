"use strict";
const fs = require("fs");
const sharp = require("sharp");
module.exports = {
  async up(queryInterface, Sequelize) {
    let result = fs.readFileSync("./data/event.json", "utf-8");
    result = await JSON.parse(result);
    const data = await Promise.all(
      result.map(async (el) => {
        console.log(el.name);
        el.createdAt = new Date();
        el.updatedAt = new Date();
        if (el.image) {
          el.image = await sharp(Buffer.from(el.image))
            .toFormat("webp")
            .toBuffer();
        }
        return el;
      })
    );

    await queryInterface.bulkInsert("Events", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events");
  },
};
