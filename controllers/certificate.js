const csvtojsonV2 = require("csvtojson/v2");
const { DATA_NOT_FOUND } = require("../constants/ErrorKeys");
const createCertificate = require("../helpers/CreateCertificate");
const { Certificate, Event, CertificateTemplate, Logo } = require("../models");
const sharp = require("sharp");

module.exports = class Controller {
  static async bulkInsertParticipants(req, res, next) {
    try {
      console.log("=========================================================");
      console.log(req.files.file.size);
      const file = req.files.file.data.toString();
      const { EventId } = req.body;
      console.log("=========================================================");
      const result = await csvtojsonV2({
        trim: true,
        delimiter: ";",
      }).fromString(file);
      const data = result
        .map((el) => {
          el.EventId = EventId;
          return el;
        })
        .filter((el) => el.name.length);
      // console.log(result);
      const insertData = await Certificate.bulkCreate(data);
      res.status(200).json({ message: `${insertData.length} data inserted` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async patchCertificateTemplateParticipantsByStatus(req, res, next) {
    try {
      const { EventId, CertificateTemplateId, status } = req.body;
      console.log({ EventId, CertificateTemplateId, status });
      const data = await Certificate.update(
        { CertificateTemplateId },
        { where: { EventId, status } }
      );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getCertificateByPhone(req, res, next) {
    try {
      const { baseurl: baseUrl, eventid: EventId } = req.headers;
      const { phone } = req.params;
      const data = await Certificate.findOne({
        where: { phone, EventId },
      });
      if (!data) throw { name: DATA_NOT_FOUND };
      const { id, name, status, CertificateTemplateId, file } = data;
      if (!file) {
        const certificate = await createCertificate({
          id,
          name,
          status,
          baseUrl,
          CertificateTemplateId,
        });
        console.log(certificate);
        await Certificate.update(
          {
            file: certificate.data,
          },
          { where: { id } }
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" +
            status.split(" ").join("_") +
            "-" +
            name.split(" ").join("_") +
            ".png"
        );
        res
          .type("image/png")
          .send(await sharp(certificate.data).toFormat("png").toBuffer());
      } else {
        console.log(name);
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" +
            status.split(" ").join("_") +
            "-" +
            name.split(" ").join("_") +
            ".png"
        );
        res
          .type("image/png")
          .send(await sharp(file).toFormat("png").toBuffer());
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getCertificateListByEventId(req, res, next) {
    try {
      const { EventId } = req.params;
      const result = await Certificate.findAll({ where: { EventId } });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getCertificateVerification(req, res, next) {
    try {
      const { CertificateId } = req.params;
      const data = await Certificate.findOne({
        where: { id: CertificateId },
        attributes: ["id", "name", "status"],
        include: [
          {
            model: Event,
            attributes: [
              "name",
              "location",
              "description",
              "time",
              "duration",
              ["updatedAt", "signedAt"],
            ],
          },
          {
            model: CertificateTemplate,
            as: "Signature",
            attributes: [["signName", "name"]],
            include: [
              {
                model: Logo,
                as: "Company",
                attributes: ["name"],
              },
            ],
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
};
