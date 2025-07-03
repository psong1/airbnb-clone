module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Booking', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER,
    checkIn: DataTypes.DATEONLY,
    checkOut: DataTypes.DATEONLY,
    totalCost: DataTypes.FLOAT,
    status: DataTypes.STRING, // 'pending', 'confirmed', 'cancelled'
    Numguests: DataTypes.INTEGER,
  }, {
    tableName: 'Booking',
    timestamps: false
  });
};
