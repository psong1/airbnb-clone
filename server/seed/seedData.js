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
];

const listings = [
  {
    id: 1,
    host_id: 1,
    title: "Cozy Downtown Apartment",
    description: "A comfortable 1-bedroom apartment in the heart of the city.",
    address: "123 Main Street, New York, NY 10001",
    city: "New York",
    state: "NY",
    price_per_night: 120.0,
  },
  {
    id: 2,
    host_id: 3,
    title: "Beachside Bungalow",
    description: "Relax by the ocean in this charming bungalow.",
    address: "456 Ocean Drive, Miami, FL 33101",
    city: "Miami",
    state: "FL",
    price_per_night: 200.0,
  },
  {
    id: 3,
    host_id: 4,
    title: "Mountain Cabin Retreat",
    description: "Secluded cabin in the woods with stunning views.",
    address: "789 Mountain Road, Denver, CO 80202",
    city: "Denver",
    state: "CO",
    price_per_night: 150.0,
  },
  {
    id: 4,
    host_id: 1,
    title: "Modern Loft",
    description: "Spacious loft with open-concept living area.",
    address: "321 Tech Street, San Francisco, CA 94102",
    city: "San Francisco",
    state: "CA",
    price_per_night: 180.0,
  },
  {
    id: 5,
    host_id: 3,
    title: "Country Cottage",
    description: "Quaint cottage surrounded by rolling hills.",
    address: "654 Country Lane, Austin, TX 78701",
    city: "Austin",
    state: "TX",
    price_per_night: 100.0,
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
];

// Will need to fill with images w/ id, listing_id, and url
const images = [];

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
