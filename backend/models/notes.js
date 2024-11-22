const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    ticket_id: { type: String },
    user_uid: { type: String },
    notes: { type: String, required: true },
    // reply_by: { type: Map, of: String, default: {} },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = {
  name: "Notes",
  schema: notesSchema,
};
