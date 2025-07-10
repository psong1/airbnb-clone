const sequelize = require("../config/connection");
const {
  User,
  Listing,
  Booking,
  Review,
  Payment,
  Amenity,
  ListingAmenity,
  Image,
} = require("../models");
const {
  users,
  listings,
  bookings,
  reviews,
  payments,
  amenities,
  listing_amenities,
  images,
} = require("../seed/seedData");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await User.bulkCreate(users);
  console.log("\n----- USERS SEEDED -----\n");

  await Listing.bulkCreate(listings);
  console.log("\n----- LISTINGS SEEDED -----\n");

  await Booking.bulkCreate(bookings);
  console.log("\n----- BOOKINGS SEEDED -----\n");

  await Review.bulkCreate(reviews);
  console.log("\n----- REVIEWS SEEDED -----\n");

  await Payment.bulkCreate(payments);
  console.log("\n----- PAYMENTS SEEDED -----\n");

  await Amenity.bulkCreate(amenities);
  console.log("\n----- AMENITIES SEEDED -----\n");

  await ListingAmenity.bulkCreate(listing_amenities);
  console.log("\n----- LISTING AMENITIES SEEDED -----\n");

  await Image.bulkCreate(images);
  console.log("\n----- IMAGES SEEDED -----\n");

  process.exit(0);
};

seedAll();
