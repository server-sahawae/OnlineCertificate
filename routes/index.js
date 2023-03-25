const routes = require("express").Router();
const certificateTemplateRoutes = require("./certificate-template");
const certificateRoutes = require("./certificate");
const eventRoutes = require("./event");
const logoRoutes = require("./logo");

routes.use("/certificatetemplate", certificateTemplateRoutes);
routes.use("/certificate", certificateRoutes);
routes.use("/event", eventRoutes);
routes.use("/logo", logoRoutes);
module.exports = routes;
