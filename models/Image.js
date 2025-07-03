module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Image', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    propertyId: DataTypes.INTEGER,
    url: DataTypes.STRING,
  }, {
    tableName: 'Image',
    timestamps: false
  });
};
