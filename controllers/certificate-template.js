const csvtojsonV2 = require("csvtojson/v2");
const { NOT_IMAGE } = require("../constants/ErrorKeys");
const { CertificateTemplate } = require("../models");
// const sharp = require("sharp");

module.exports = class Controller {
  static async postCertificateTemplate(req, res, next) {
    try {
      console.log("=========================================================");
      console.log(Object.keys(req.files));
      // console.log(req.body.EventId);
      const { EventId } = req.body;
      const {
        name,
        data,
        size,
        encoding,
        tempFilePath,
        truncated,
        mimetype,
        md5,
        mv,
      } = req.files.image;
      console.log(data);
      // const dataImage = await sharp(data).toFormat("webp").toBuffer();
      if (!mimetype.startsWith("image")) throw { name: NOT_IMAGE };
      console.log("=========================================================");
      const dataCreate = await CertificateTemplate.create({
        EventId,
        fileType: mimetype,
        file: data,
      });
      res.status(200).json(dataCreate.id);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async patchCertificateTemplate(req, res, next) {
    try {
      const { id } = req.headers;
      const {
        namePosition,
        statusPosition,
        QRx,
        QRy,
        EventId,
        LogoId,
        signName,
      } = req.body;
      const data = await CertificateTemplate.update(
        { ...req.body },
        { where: { id } }
      );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
