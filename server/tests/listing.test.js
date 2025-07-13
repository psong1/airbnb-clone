const request = require("supertest");
const app = require("../server");
const { Listing, User } = require("../models");

describe("POST /api/listings", () => {
  let host;

  beforeAll(async () => {
    host = await User.findOne({ where: { role: "host" } });
  });

  it("allows a host to list a property for rent", async () => {
    const listingData = {
      host_id: host.id,
      title: "Test Host's New Property",
      description: "A beautiful test property for rent.",
      address: "999 Test Lane, Testville, TS 12345",
      city: "Testville",
      state: "TS",
      price_per_night: 123.45,
    };

    const res = await request(app).post("/api/listings").send(listingData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.host_id).toBe(listingData.host_id);
    expect(res.body.title).toBe(listingData.title);
    expect(res.body.city).toBe(listingData.city);
    expect(res.body.state).toBe(listingData.state);

    await Listing.destroy({ where: { id: res.body.id } });
  });
});
