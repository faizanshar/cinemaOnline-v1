"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      film.belongsTo(models.category, {
        as: "category",
        foreignKey: {
          name: "categoryId",
        },
      });
    }
  }
  film.init(
    {
      title: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      filmUrl: DataTypes.TEXT,
      description: DataTypes.TEXT,
      thumbnail: DataTypes.TEXT,
      poster: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "film",
    }
  );
  return film;
};
