const mongoose = require("mongoose");
const models = require("../models");

module.exports = function initConnection() {
  mongoose.connect("mongodb://localhost:27017/help-desk_database");
  let database = mongoose.connection;
  database.on("error", function (err) {
    console.log("Failed to connect database", err);
    process.exit(1);
  });

  database.on("connected", function () {
    console.log("Database Connected");
  });

  database.on("open", async function () {
    console.log("Database Connection opened");
    await models.setup(database);
    console.log("Models set successfully");
  });
};
