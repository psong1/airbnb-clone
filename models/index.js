const { Sequelize } = require('sequelize');
const sequelize = new Sequelize();


const User = require('./User')(sequelize, Sequelize.DataTypes);
const Property = require('./Property')(sequelize, Sequelize.DataTypes);
const Booking = require('./Booking')(sequelize, Sequelize.DataTypes);
const Image = require('./Image')(sequelize, Sequelize.DataTypes);
const Review = require('./Review')(sequelize, Sequelize.DataTypes);

// Associations
User.hasMany(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId' });

Property.hasMany(Image, { foreignKey: 'propertyId' });
Image.belongsTo(Property, { foreignKey: 'propertyId' });

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Property.hasMany(Booking, { foreignKey: 'propertyId' });
Booking.belongsTo(Property, { foreignKey: 'propertyId' });

Property.hasMany(Review, { foreignKey: 'propertyId' });
Review.belongsTo(Property, { foreignKey: 'propertyId' });

User.hasMany(Review, { foreignKey: 'reviewerId' });
Review.belongsTo(User, { foreignKey: 'reviewerId' });

module.exports = {
  sequelize,
  User,
  Property,
  Booking,
  Image,
  Review
};
