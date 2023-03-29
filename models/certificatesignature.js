"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CertificateSignature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CertificateSignature.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      CertificateId: DataTypes.UUID,
      SignatureId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "CertificateSignature",
    }
  );
  return CertificateSignature;
};
