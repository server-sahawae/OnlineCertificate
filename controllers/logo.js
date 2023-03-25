const { Op } = require("sequelize");
const { Logo } = require("../models");
const fs = require("fs");
const sharp = require("sharp");
module.exports = class Controller {
  static async postLogo(req, res, next) {
    try {
      const { image } = req.files;
      const { name, CompanyId } = req.body;
      console.log({ ...image, name, CompanyId });
      const imageData = await sharp(image.data).toFormat("webp").toBuffer();
      const data = await Logo.create({
        file: imageData,
        name,
        CompanyId,
      });
      res.type("image/webp").send(imageData);

      // res.status(200).json({ message: `${data.name} has been uploaded` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllLogoInList(req, res, next) {
    try {
      const data = await Logo.findAll();
      fs.writeFileSync("./data/logo.json", JSON.stringify(data, null, 2));
      res.status(200).json("done");
    } catch (error) {
      next(error);
    }
  }
};
