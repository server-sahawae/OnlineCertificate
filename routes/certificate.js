const Controller = require("../controllers/certificate");

const routes = require("express").Router();

routes.post("/", Controller.bulkInsertParticipants);
routes.patch("/", Controller.patchCertificateTemplateParticipantsByStatus);
routes.post("/generate", Controller.generateCertificatesByEventId);
routes.post("/generatesome", Controller.generateEmptyCertificatesByEventId);
routes.get("/event/:EventId", Controller.getCertificateListByEventId);
routes.get("/verify/:CertificateId", Controller.getCertificateVerification);
routes.get("/:phone", Controller.getCertificateByPhone);

module.exports = routes;
