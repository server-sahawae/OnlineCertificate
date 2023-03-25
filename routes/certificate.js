const Controller = require("../controllers/certificate");

const routes = require("express").Router();

routes.post("/", Controller.bulkInsertParticipants);
routes.patch("/", Controller.patchCertificateTemplateParticipantsByStatus);
routes.get("/:phone", Controller.getCertificateByPhone);
routes.get("/event/:EventId", Controller.getCertificateListByEventId);

module.exports = routes;
