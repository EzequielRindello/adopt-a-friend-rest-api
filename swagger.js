const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: { title: "adopt-a-friend-api", description: "RESTful API project for managing dog adoptions" },
  host: "localhost:3000",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
