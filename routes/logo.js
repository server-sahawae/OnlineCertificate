const Controller = require("../controllers/logo");

const routes = require("express").Router();

routes.post("/", Controller.postLogo);
routes.get("/", Controller.getAllLogoInList);

module.exports = routes;
