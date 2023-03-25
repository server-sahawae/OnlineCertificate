const { Op } = require("sequelize");
const { Event } = require("../models");

module.exports = class Controller {
  static async createEvent(req, res, next) {
    try {
      const { name, location, time, date, description, CompanyId } = req.body;
      const data = await Event.create({ ...req.body });
      res.status(200).json(data);
    } catch (error) {
      console.log(error.errors);
      next(error);
    }
  }

  static async getEventByCompanyId(req, res, next) {
    try {
      const { CompanyId } = req.params;
      console.log(req.params);
      const result = await Event.findAll({
        where: { CompanyId },
        order: [["time", "DESC"]],
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getEventByEventId(req, res, next) {
    try {
      const { EventId } = req.params;
      const result = await Event.findOne({ where: { id: EventId } });
      res.status(200).json(result);
    } catch (error) {
      console.log(error.errors);
      next(error);
    }
  }
};
