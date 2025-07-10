const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ListingAmenity extends Model {}

ListingAmenity.init(
  {
    listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "listing",
        key: "id",
      },
    },
    amenity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "amenity",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "listing_amenity",
    indexes: [
      { unique: true, fields: ["listing_id", "amenity_id"] },
      { fields: ["amenity_id"] },
    ],
  }
);

module.exports = ListingAmenity;
