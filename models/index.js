
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize();

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Property = require('./Property')(sequelize, Sequelize.DataTypes);
const Booking = require('./Booking')(sequelize, Sequelize.DataTypes);
const Image = require('./Image')(sequelize, Sequelize.DataTypes);
const Review = require('./Review')(sequelize, Sequelize.DataTypes);



// associations
User.hasMany(Property, { 
  foreignKey: 'userId', 
  as: 'properties',
  onDelete: 'CASCADE'
});
User.hasMany(Booking, { 
  foreignKey: 'userId', 
  as: 'bookings',
  onDelete: 'CASCADE'
});
User.hasMany(Review, { 
  foreignKey: 'reviewerId', 
  as: 'reviews',
  onDelete: 'CASCADE'
});

Property.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'owner'
});
Property.hasMany(Booking, { 
  foreignKey: 'propertyId', 
  as: 'bookings',
  onDelete: 'CASCADE'
});
Property.hasMany(Review, { 
  foreignKey: 'propertyId', 
  as: 'reviews',
  onDelete: 'CASCADE'
});
Property.hasMany(Image, { 
  foreignKey: 'propertyId', 
  as: 'images',
  onDelete: 'CASCADE'
});

Booking.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user'
});
Booking.belongsTo(Property, { 
  foreignKey: 'propertyId', 
  as: 'property'
});

Review.belongsTo(User, { 
  foreignKey: 'reviewerId', 
  as: 'reviewer'
});
Review.belongsTo(Property, { 
  foreignKey: 'propertyId', 
  as: 'property'
});

Image.belongsTo(Property, { 
  foreignKey: 'propertyId', 
  as: 'property'
});

module.exports = {
  sequelize,
  User,
  Property,
  Booking,
  Review,
  Image
};
