const path = require("path");
const fs = require("fs");
const recombee = require("recombee-api-client");

// property of item should be contain data type from this
const propertyDataTypes = [
  "int",
  "double",
  "string",
  "boolean",
  "timestamp",
  "set",
  "image",
  "imageList",
];

module.exports = {
  propertyDataTypes,
};