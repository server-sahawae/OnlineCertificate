const Controller = require("../controllers/certificate-template");

const routes = require("express").Router();

routes.post("/", Controller.postCertificateTemplate);
routes.patch("/", Controller.patchCertificateTemplate);

module.exports = routes;
