module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    propertyId: DataTypes.INTEGER,
    reviewerId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
  }, {
    tableName: 'Review',
    timestamps: false
  });
};
