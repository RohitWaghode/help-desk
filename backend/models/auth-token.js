const mongoose = require("mongoose");

const authTokenSchema = new mongoose.Schema(
  {
    user_uid: { type: String, required: true },
    validate_till: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = {
  name: "AuthToken",
  schema: authTokenSchema,
};
