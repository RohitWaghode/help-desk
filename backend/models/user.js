const mongoose = require("mongoose");
const { utils } = require("../utils/index");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  user_uid: { type: String },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email_address: { type: String, required: true },
  mobile_number: { type: String, required: true },
  password: { type: String, required: true },
  user_type: { type: String, enum: ["User", "Agent", "Admin"] },
});

userSchema.pre("save", async function (next) {
  if (!this.user_uid) {
    this.user_uid = await utils.generateUid("User");
  }
  if (this.isModified("password"))
    try {
      this.password = await utils.hashPassword(this.password);
    } catch (error) {
      return next(error);
    }
  next();
});

(userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    } else {
      cb(null, isMatch);
    }
  });
}),
  (module.exports = {
    name: "User",
    schema: userSchema,
  });
