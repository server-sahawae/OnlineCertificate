"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models.Certificate);
      // define association here
    }
  }
  Event.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      time: DataTypes.DATE,
      description: DataTypes.STRING,
      CompanyId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
