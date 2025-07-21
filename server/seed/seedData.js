const users = [
  {
    id: 1,
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    password: "alicepassword",
    role: "host",
  },
  {
    id: 2,
    first_name: "Bob",
    last_name: "Smith",
    email: "bob.smith@example.com",
    password: "bobpassword",
    role: "guest",
  },
  {
    id: 3,
    first_name: "Carol",
    last_name: "Lee",
    email: "carol.lee@example.com",
    password: "carolpassword",
    role: "host",
  },
  {
    id: 4,
    first_name: "David",
    last_name: "Kim",
    email: "david.kim@example.com",
    password: "davidpassword",
    role: "host",
  },
  {
    id: 5,
    first_name: "Eva",
    last_name: "Green",
    email: "eva.green@example.com",
    password: "evapassword",
    role: "guest",
  },
  {
    id: 6,
    first_name: "Frank",
    last_name: "Wright",
    email: "frank.wright@example.com",
    password: "frankpassword",
    role: "guest",
  },
  {
    id: 7,
    first_name: "Grace",
    last_name: "Hopper",
    email: "grace.hopper@example.com",
    password: "gracepassword",
    role: "host",
  },
  {
    id: 8,
    first_name: "Henry",
    last_name: "Ford",
    email: "henry.ford@example.com",
    password: "henrypassword",
    role: "guest",
  },
];

const listings = [
  {
    id: 1,
    host_id: 1,
    title: "Cozy Downtown New York Apartment",
    description: "A comfortable 1-bedroom apartment in the heart of the city.",
    address: "123 Main Street, New York, NY 10001",
    city: "New York",
    state: "NY",
    price_per_night: 120.0,
  },
  {
    id: 2,
    host_id: 3,
    title: "Miami Beachside Bungalow",
    description: "Relax by the ocean in this charming bungalow.",
    address: "456 Ocean Drive, Miami, FL 33101",
    city: "Miami",
    state: "FL",
    price_per_night: 200.0,
  },
  {
    id: 3,
    host_id: 4,
    title: "Mountain Cabin Retreat in Colorado",
    description: "Secluded cabin in the woods with stunning views.",
    address: "789 Mountain Road, Denver, CO 80202",
    city: "Denver",
    state: "CO",
    price_per_night: 150.0,
  },
  {
    id: 4,
    host_id: 1,
    title: "Modern Loft in San Francisco",
    description: "Spacious loft with open-concept living area.",
    address: "321 Tech Street, San Francisco, CA 94102",
    city: "San Francisco",
    state: "CA",
    price_per_night: 180.0,
  },
  {
    id: 5,
    host_id: 3,
    title: "Country Cottage in Austin Texas",
    description: "Quaint cottage surrounded by rolling hills.",
    address: "654 Country Lane, Austin, TX 78701",
    city: "Austin",
    state: "TX",
    price_per_night: 100.0,
  },
  {
    id: 6,
    host_id: 7,
    title: "Lakefront Villa in Orlando",
    description: "Luxury villa with private dock and lake views.",
    address: "987 Lakeview Dr, Orlando, FL 32801",
    city: "Orlando",
    state: "FL",
    price_per_night: 350.0,
  },
  {
    id: 7,
    host_id: 4,
    title: "Chicago Urban Studio",
    description: "Modern studio in the heart of downtown.",
    address: "222 City Center, Chicago, IL 60601",
    city: "Chicago",
    state: "IL",
    price_per_night: 110.0,
  },
  {
    id: 8,
    host_id: 7,
    title: "Desert Oasis Home",
    description: "Chic home with pool in the desert.",
    address: "555 Sand Dune Rd, Phoenix, AZ 85001",
    city: "Phoenix",
    state: "AZ",
    price_per_night: 175.0,
  },
];

const bookings = [
  {
    id: 1,
    listing_id: 1,
    guest_id: 2,
    start_date: "2025-07-15",
    end_date: "2025-07-18",
    status: "approved",
  },
  {
    id: 2,
    listing_id: 2,
    guest_id: 5,
    start_date: "2025-08-01",
    end_date: "2025-08-05",
    status: "approved",
  },
  {
    id: 3,
    listing_id: 3,
    guest_id: 2,
    start_date: "2025-09-10",
    end_date: "2025-09-14",
    status: "pending",
  },
  {
    id: 4,
    listing_id: 4,
    guest_id: 5,
    start_date: "2025-10-20",
    end_date: "2025-10-22",
    status: "approved",
  },
  {
    id: 5,
    listing_id: 5,
    guest_id: 2,
    start_date: "2025-11-05",
    end_date: "2025-11-10",
    status: "pending",
  },
  {
    id: 6,
    listing_id: 6,
    guest_id: 6,
    start_date: "2025-12-01",
    end_date: "2025-12-05",
    status: "approved",
  },
  {
    id: 7,
    listing_id: 7,
    guest_id: 8,
    start_date: "2025-12-10",
    end_date: "2025-12-12",
    status: "pending",
  },
  {
    id: 8,
    listing_id: 8,
    guest_id: 2,
    start_date: "2025-12-20",
    end_date: "2025-12-25",
    status: "approved",
  },
];

const reviews = [
  {
    id: 1,
    booking_id: 1,
    user_id: 2,
    rating: 5,
    comment: "Great stay, very clean!",
  },
  {
    id: 2,
    booking_id: 2,
    user_id: 5,
    rating: 4,
    comment: "Loved the ocean view.",
  },
  {
    id: 3,
    booking_id: 4,
    user_id: 5,
    rating: 5,
    comment: "Cozy and quiet.",
  },
  {
    id: 4,
    booking_id: 4,
    user_id: 2,
    rating: 4,
    comment: "Stylish place but a bit noisy.",
  },
  {
    id: 5,
    booking_id: 5,
    user_id: 2,
    rating: 5,
    comment: "Charming spot, perfect getaway.",
  },
  {
    id: 6,
    booking_id: 6,
    user_id: 6,
    rating: 5,
    comment: "Amazing villa, beautiful lake!",
  },
  {
    id: 7,
    booking_id: 7,
    user_id: 8,
    rating: 4,
    comment: "Great location, but a bit noisy downtown.",
  },
  {
    id: 8,
    booking_id: 8,
    user_id: 2,
    rating: 5,
    comment: "Loved the pool and desert vibe!",
  },
];

const payments = [
  {
    id: 1,
    booking_id: 1,
    amount: 360.0,
    method: "credit_card",
    status: "approved",
    paid_at: "2025-07-10T10:00:00Z",
  },
  {
    id: 2,
    booking_id: 2,
    amount: 800.0,
    method: "paypal",
    status: "approved",
    paid_at: "2025-07-25T14:30:00Z",
  },
  {
    id: 3,
    booking_id: 4,
    amount: 360.0,
    method: "apple_pay",
    status: "approved",
    paid_at: "2025-10-15T09:15:00Z",
  },
  {
    id: 4,
    booking_id: 6,
    amount: 1400.0,
    method: "credit_card",
    status: "approved",
    paid_at: "2025-11-20T10:00:00Z",
  },
  {
    id: 5,
    booking_id: 8,
    amount: 875.0,
    method: "paypal",
    status: "approved",
    paid_at: "2025-12-10T14:30:00Z",
  },
];

const amenities = [
  {
    id: 1,
    amenity_name: "WiFi",
  },
  {
    id: 2,
    amenity_name: "Kitchen",
  },
  {
    id: 3,
    amenity_name: "Free parking",
  },
  {
    id: 4,
    amenity_name: "Air conditioning",
  },
  {
    id: 5,
    amenity_name: "Pool",
  },
  {
    id: 6,
    amenity_name: "Gym",
  },
  {
    id: 7,
    amenity_name: "Pet friendly",
  },
  {
    id: 8,
    amenity_name: "Balcony",
  },
];

const listing_amenities = [
  {
    listing_id: 1,
    amenity_id: 1,
  },
  {
    listing_id: 1,
    amenity_id: 2,
  },
  {
    listing_id: 1,
    amenity_id: 4,
  },
  {
    listing_id: 2,
    amenity_id: 1,
  },
  {
    listing_id: 2,
    amenity_id: 5,
  },
  {
    listing_id: 2,
    amenity_id: 7,
  },
  {
    listing_id: 3,
    amenity_id: 1,
  },
  {
    listing_id: 3,
    amenity_id: 3,
  },
  {
    listing_id: 3,
    amenity_id: 8,
  },
  {
    listing_id: 4,
    amenity_id: 1,
  },
  {
    listing_id: 4,
    amenity_id: 2,
  },
  {
    listing_id: 4,
    amenity_id: 6,
  },
  {
    listing_id: 5,
    amenity_id: 1,
  },
  {
    listing_id: 5,
    amenity_id: 2,
  },
  {
    listing_id: 5,
    amenity_id: 7,
  },
  {
    listing_id: 6,
    amenity_id: 1,
  },
  {
    listing_id: 6,
    amenity_id: 5,
  },
  {
    listing_id: 6,
    amenity_id: 8,
  },
  {
    listing_id: 7,
    amenity_id: 1,
  },
  {
    listing_id: 7,
    amenity_id: 2,
  },
  {
    listing_id: 7,
    amenity_id: 4,
  },
  {
    listing_id: 8,
    amenity_id: 1,
  },
  {
    listing_id: 8,
    amenity_id: 3,
  },
  {
    listing_id: 8,
    amenity_id: 7,
  },
];

const images = [
  { id: 1, listing_id: 1, url: "seed/ny.jpg" },
  { id: 2, listing_id: 2, url: "seed/miami.jpg" },
  { id: 3, listing_id: 3, url: "seed/colorado.jpg" },
  { id: 4, listing_id: 4, url: "seed/sanfran.jpg" },
  { id: 5, listing_id: 5, url: "seed/austin.jpg" },
  { id: 6, listing_id: 6, url: "seed/orlando.jpg" },
  { id: 7, listing_id: 7, url: "seed/chicago.jpg" },
  { id: 8, listing_id: 8, url: "seed/arizona.jpg" },
];

module.exports = {
  users,
  listings,
  bookings,
  reviews,
  payments,
  amenities,
  listing_amenities,
  images,
};
