module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Property', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    address: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    amenities: DataTypes.TEXT,
    maxGuests: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
  }, {
    tableName: 'Property',
    timestamps: false
  });
};
