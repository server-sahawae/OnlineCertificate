"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Logo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Logo.hasMany(models.CertificateTemplate);
      Logo.hasMany(models.Signature);
    }
  }
  Logo.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      // fileType: DataTypes.STRING,
      file: DataTypes.BLOB("medium"),
      CompanyId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Logo",
    }
  );
  return Logo;
};
