const request = require("supertest");
const app = require("../server");
const { listings } = require("../seed/seedData");

describe("GET /api/listings", () => {
  it("returns all listings when no filters provided", async () => {
    const res = await request(app).get("/api/listings");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("filters by city (case-insensitive)", async () => {
    const city = listings[0].city;
    const res = await request(app).get(
      `/api/listings?city=${encodeURIComponent(city.toUpperCase())}`
    );
    expect(res.statusCode).toBe(200);
    expect(
      res.body.every(
        (isting) => isting.city.toLowerCase() === city.toLowerCase()
      )
    ).toBe(true);
  });

  it("filters by state (case-insensitive)", async () => {
    const state = listings[1].state;
    const res = await request(app).get(
      `/api/listings?state=${encodeURIComponent(state.toLowerCase())}`
    );
    expect(res.statusCode).toBe(200);
    expect(
      res.body.every(
        (listing) => listing.state.toLowerCase() === state.toLowerCase()
      )
    ).toBe(true);
  });

  it("filters by zip code", async () => {
    const zip = listings[2].address.split(",")[2]?.trim().split(" ")[1];
    const res = await request(app).get(`/api/listings?zip=${zip}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.every((l) => l.address.includes(zip))).toBe(true);
  });

  it("combines city, state, and zip filters", async () => {
    const target = listings[3];
    const zip = target.address.split(",")[2]?.trim().split(" ")[1];
    const res = await request(app).get(
      `/api/listings?city=${encodeURIComponent(
        target.city
      )}&state=${encodeURIComponent(target.state)}&zip=${zip}`
    );
    expect(res.statusCode).toBe(200);
    expect(
      res.body.every(
        (listing) =>
          listing.city.toLowerCase() === target.city.toLowerCase() &&
          listing.state.toLowerCase() === target.state.toLowerCase() &&
          listing.address.includes(zip)
      )
    ).toBe(true);
  });

  it("returns empty array when no listings match", async () => {
    const res = await request(app).get("/api/listings?city=NoSuchCity");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
