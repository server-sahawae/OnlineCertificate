"use strict";
const fs = require("fs");
const sharp = require("sharp");
module.exports = {
  async up(queryInterface, Sequelize) {
    let result = fs.readFileSync("./data/CertificateTemplate.json", "utf-8");
    result = await JSON.parse(result);
    const data = await Promise.all(
      result.map(async (el) => {
        console.log(Object.keys(el));
        el.createdAt = new Date();
        el.updatedAt = new Date();
        el.file = await sharp(Buffer.from(el.file)).toFormat("webp").toBuffer();
        return el;
      })
    );

    await queryInterface.bulkInsert("CertificateTemplates", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CertificateTemplates");
  },
};
