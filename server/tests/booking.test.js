const request = require("supertest");
const app = require("../server");
const { Booking, Listing, User } = require("../models");

describe("POST /api/bookings", () => {
  let listing, guest;

  beforeAll(async () => {
    listing = await Listing.findOne();
    guest = await User.findOne();
  });

  it("creates a new booking", async () => {
    const bookingData = {
      listing_id: listing.id,
      guest_id: guest.id,
      start_date: "2025-12-01",
      end_date: "2025-12-05",
      status: "pending",
    };

    const res = await request(app).post("/api/bookings").send(bookingData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.listing_id).toBe(bookingData.listing_id);
    expect(res.body.guest_id).toBe(bookingData.guest_id);
    expect(res.body.start_date).toBe(bookingData.start_date);
    expect(res.body.end_date).toBe(bookingData.end_date);
    expect(res.body.status).toBe(bookingData.status);

    await Booking.destroy({ where: { id: res.body.id } });
  });
});
