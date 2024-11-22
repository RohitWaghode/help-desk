const mongoose = require("mongoose");
const { utils } = require("../utils");

const ticketSchema = new mongoose.Schema(
  {
    ticket_id: { type: String },
    title: { type: String, required: true },
    user_uid: { type: String, required: true },
    customer_name: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "pending", "closed"],
      default: "pending",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

ticketSchema.pre("save", async function (next) {
  if (!this.ticket_id) {
    this.ticket_id = await utils.generateUid("ticket");
  }
  next();
});

module.exports = {
  name: "Ticket",
  schema: ticketSchema,
};
