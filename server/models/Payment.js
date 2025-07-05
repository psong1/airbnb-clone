const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Payment extends Model {}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "booking",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    method: {
      type: DataTypes.ENUM(
        "credit_card",
        "checking_account",
        "paypal",
        "apple_pay",
        "google_pay"
      ),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "denied"),
      allowNull: false,
      defaultValue: "pending",
    },
    paid_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true,
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "payment",
    indexes: [{ fields: ["booking_id"] }],
  }
);

module.exports = Payment;
