const User = require("./User");
const Review = require("./Review");
const Payment = require("./Payment");
const ListingAmenity = require("./ListingAmenity");
const Listing = require("./Listing");
const Image = require("./Image");
const Booking = require("./Booking");
const Amenity = require("./Amenity");
const sequelize = require("../config/connection");

User.hasMany(Listing, { foreignKey: "host_id", as: "listings" });
Listing.belongsTo(User, { foreignKey: "host_id", as: "host" });

User.hasMany(Booking, { foreignKey: "guest_id", as: "bookings" });
Booking.belongsTo(User, { foreignKey: "guest_id", as: "guest" });

Listing.hasMany(Booking, { foreignKey: "listing_id", as: "bookings" });
Booking.belongsTo(Listing, { foreignKey: "listing_id", as: "listing" });

Booking.hasOne(Payment, { foreignKey: "booking_id", as: "payment" });
Payment.belongsTo(Booking, { foreignKey: "booking_id", as: "booking" });

Booking.hasOne(Review, { foreignKey: "booking_id", as: "review" });
Review.belongsTo(Booking, { foreignKey: "booking_id", as: "booking" });

User.hasMany(Review, { foreignKey: "user_id", as: "reviews" });
Review.belongsTo(User, { foreignKey: "user_id", as: "user" });

Listing.hasMany(Image, { as: "images", foreignKey: "listing_id" });
Image.belongsTo(Listing, { as: "listing", foreignKey: "listing_id" });

Listing.belongsToMany(Amenity, {
  through: ListingAmenity,
  foreignKey: "amenity_id",
  otherKey: "listing_id",
  as: "amenities",
});

Amenity.belongsToMany(Listing, {
  through: ListingAmenity,
  foreignKey: "amenity_id",
  otherKey: "listing_id",
  as: "listings",
});

module.exports = {
  sequelize,
  User,
  Listing,
  Booking,
  Payment,
  Review,
  Image,
  Amenity,
  ListingAmenity,
};
