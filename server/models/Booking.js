const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Booking extends Model {}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "listing",
        key: "id",
      },
    },
    guest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: new Date().toISOString().split("T")[0],
      },
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterField(val) {
          if (val <= this.start_date) {
            throw new Error("End date must be after start date");
          }
        },
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "denied"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "booking",
    indexes: [{ fields: ["listing_id"] }, { fields: ["guest_id"] }],
  }
);

module.exports = Booking;
