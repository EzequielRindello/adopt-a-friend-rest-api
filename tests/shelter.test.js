const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

const shelterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});
const Shelter = mongoose.model("Shelter", shelterSchema);

describe("GET /shelters", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should return a list of shelters", async () => {
    await Shelter.create([
      { name: "Shelter 1", location: "City A" },
      { name: "Shelter 2", location: "City B" },
    ]);

    const response = await request(app).get("/shelters");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return a single shelter", async () => {
    const shelter = await Shelter.create({
      name: "Shelter 3",
      location: "City C",
    });

    const response = await request(app).get(`/shelters/${shelter._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Shelter 3");
  });

  it("should return 404 if shelter is not found", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/shelters/${nonExistentId}`);
    expect(response.status).toBe(404);
  });
});
