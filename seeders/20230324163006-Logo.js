"use strict";
const fs = require("fs");
const sharp = require("sharp");
module.exports = {
  async up(queryInterface, Sequelize) {
    // const data = await JSON.parse(
    //   Promise.all(fs.readFileSync("./data/logo.json", "utf-8")).map(
    //     async (el) => {
    //       console.log(el.name);
    //       el.createdAt = new Date();
    //       el.updatedAt = new Date();
    //       el.file = await sharp(el.file).toFormat("webp").toBuffer();
    //       return el;
    //     }
    //   )
    // );

    let result = fs.readFileSync("./data/logo.json", "utf-8");
    result = await JSON.parse(result);
    const data = await Promise.all(
      result.map(async (el) => {
        console.log(el.name);
        el.createdAt = new Date();
        el.updatedAt = new Date();
        // console.log(await sharp(el.file.data).toBuffer("image/webp"));
        el.file = await sharp(Buffer.from(el.file)).toFormat("webp").toBuffer();
        return el;
      })
    );

    // console.log(data);

    // fs.readFileSync("./data/logo.json", "utf8");
    await queryInterface.bulkInsert("Logos", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Logos");
  },
};
