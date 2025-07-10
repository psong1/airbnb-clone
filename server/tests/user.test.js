const request = require("supertest");
const app = require("../server");
const { users, listings } = require("../seed/seedData");

describe("GET /api/users", () => {
  it("returns all users without password fields", async () => {
    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).not.toHaveProperty("password");
  });
});

describe("GET /api/users/:id", () => {
  it("returns user profile by id without password", async () => {
    const allUsersRes = await request(app).get("/api/users");
    const validUser = allUsersRes.body[0]; 
    
    const res = await request(app).get(`/api/users/${validUser.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email");
    expect(res.body).not.toHaveProperty("password");
  });

  it("returns error for non-existent user", async () => {
    const res = await request(app).get("/api/users/99999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});

describe("PUT /api/users/:id", () => {
  it("updates user profile information", async () => {
    const allUsersRes = await request(app).get("/api/users");
    const validUser = allUsersRes.body[0]; 
    const updateData = {
      first_name: "Updated",
      last_name: "User",
      email: "updated.user@test.com"
    };

    const res = await request(app)
      .put(`/api/users/${validUser.id}`)
      .send(updateData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("returns error when updating non-existent user", async () => {
    const updateData = {
      first_name: "Test"
    };

    const res = await request(app)
      .put("/api/users/99999")
      .send(updateData);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});

describe("DELETE /api/users/:id", () => {
  it("deletes user account successfully", async () => {
    const allUsersRes = await request(app).get("/api/users");
    const validUser = allUsersRes.body[allUsersRes.body.length - 1]; 

    const res = await request(app).delete(`/api/users/${validUser.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("returns error when deleting non-existent user", async () => {
    const res = await request(app).delete("/api/users/99999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
}); 