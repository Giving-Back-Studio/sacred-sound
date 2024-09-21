const recombee = require("recombee-api-client");
require("dotenv").config();

// Create instance of recombee api client
const recombeeClient = new recombee.ApiClient(
  process.env.RECOMBEE_DB,
  process.env.RECOMBEE_API_TOKEN,
  { region: process.env.RECOMBEE_REGION }
);

module.exports = {
    recombeeClient,
};