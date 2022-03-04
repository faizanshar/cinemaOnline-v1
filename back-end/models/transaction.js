"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaction.belongsTo(models.film, {
        as: "film",
        foreignKey: {
          name: "filmId",
        },
      });
      transaction.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  transaction.init(
    {
      userId: DataTypes.INTEGER,
      filmId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      accountNumber: DataTypes.INTEGER,
      transferProof: DataTypes.TEXT,
      orderDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
