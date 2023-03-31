const csvtojsonV2 = require("csvtojson/v2");
const {
  DATA_NOT_FOUND,
  CERTIFICATE_UNAVAILABLE,
} = require("../constants/ErrorKeys");
const createCertificate = require("../helpers/CreateCertificate");
const { Certificate, Event, CertificateTemplate, Logo } = require("../models");
const sharp = require("sharp");
const asyncs = require("async");

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
      if (!data.file) throw { name: CERTIFICATE_UNAVAILABLE };
      const { name, status, file } = data;

      console.log(name);
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" +
          status.split(" ").join("_") +
          "-" +
          name.split(" ").join("_") +
          ".png"
      );
      res.type("image/png").send(Buffer.from(file));
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

  static async generateCertificatesByEventId(req, res, next) {
    try {
      const { baseUrl, EventId, status } = req.body;
      console.log(req.body);
      let options;
      if (status) {
        options = { EventId, status };
      } else options = { EventId };

      const { count, rows } = await Certificate.findAndCountAll({
        where: options,
        attributes: ["id", "name", "status", "CertificateTemplateId"],
        // limit: 30,
      });
      // console.log(count);
      for (let i = 0; i < count; i++) {
        const el = rows[i];
        console.log("================================");
        console.log(
          `${i + 1}/${count} Generating certificate of ${el.name}...`
        );
        const certificate = await createCertificate({
          id: el.id,
          name: el.name,
          status: el.status,
          baseUrl,
          CertificateTemplateId: el.CertificateTemplateId,
        });
        console.log("================================");
        console.log(`${i + 1}/${count} Generated certificate of ${el.name}...`);
        console.log("================================");

        await Certificate.update(
          {
            file: certificate.data,
          },
          { where: { id: el.id } }
        );
        console.log(`${i + 1}/${count} Certificate of ${el.name} is done`);
        console.log("================================");
      }
      // const { id, name, CertificateTemplateId } = data;
      // console.log(data);
      // await asyncs.map(data, async (el) => {
      //   console.log(el.name);
      //   const certificate = await createCertificate({
      //     id: el.id,
      //     name: el.name,
      //     status: el.status,
      //     baseUrl,
      //     CertificateTemplateId: el.CertificateTemplateId,
      //   });
      // await Certificate.update(
      //   {
      //     file: certificate.data,
      //   },
      //   { where: { id: el.id } }
      // );
      //   return `${el.name} `;
      // });

      // const result = await Promise.allSettled(
      //   data.map(async (el) => {
      //     try {
      //       const certificate = await createCertificate({
      //         id: el.id,
      //         name: el.name,
      //         status: el.status,
      //         baseUrl,
      //         CertificateTemplateId: el.CertificateTemplateId,
      //       });
      //       // await Certificate.update(
      //       //   {
      //       //     file: certificate.data,
      //       //   },
      //       //   { where: { id: el.id } }
      //       // );
      //       return `${el.name} `;
      //     } catch (error) {
      //       return error;
      //     }
      //   })
      // );

      // console.log(certificate);
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res.send(error);
      // next(error);
    }
  }
};
