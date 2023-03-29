"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CertificateTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CertificateTemplate.hasMany(models.Certificate);
      CertificateTemplate.hasMany(models.Signature);
      CertificateTemplate.belongsTo(models.Logo, {
        as: "Company",
        foreignKey: "LogoId",
      });
      CertificateTemplate.belongsTo(models.Logo);
    }
  }
  CertificateTemplate.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // fileType: DataTypes.STRING,
      file: DataTypes.BLOB("medium"),
      namePosition: DataTypes.FLOAT,
      statusPosition: DataTypes.FLOAT,
      QRx: DataTypes.FLOAT,
      QRy: DataTypes.FLOAT,
      EventId: DataTypes.UUID,
      LogoId: DataTypes.UUID,
      signName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CertificateTemplate",
    }
  );
  return CertificateTemplate;
};
