const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Amenity extends Model {}

Amenity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    amenity_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "amenity",
  }
);

module.exports = Amenity;
