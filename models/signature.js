"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Signature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Signature.belongsTo(models.CertificateTemplate);
      Signature.belongsTo(models.Logo);
    }
  }
  Signature.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      QRx: DataTypes.INTEGER,
      QRy: DataTypes.INTEGER,
      name: DataTypes.STRING,
      CertificateTemplateId: DataTypes.UUID,
      LogoId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Signature",
    }
  );
  return Signature;
};
