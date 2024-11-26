const uuid = require("uuid");
const bcrypt = require("bcrypt");

const saltNumber = 15;

const utils = {
  generateUid: async function generateUid(prefix, val = 10) {
    return `${prefix}${uuid.v4()}`.substring(0, val);
  },
  hashPassword: async function hashPassword(password) {
    const salt = await bcrypt.genSalt(saltNumber);
    const hash_password = await bcrypt.hash(password, salt);
    return hash_password.substring(0, 10);
  },

  // validateEmail: function validateEmail(email_address) {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!email_address) {
  //     return "Email Address is required";
  //   } else if (!emailRegex.test(email_address)) {
  //     return "Invalid Email Address";
  //   }
  // },

  // validateMobileNumber: function validateMobileNumber(mobile_number) {
  //   const mobileRegex = /^\d{10}$/;

  //   if (!mobile_number) {
  //     return "Mobile Number is required";
  //   } else if (!mobileRegex.test(mobile_number)) {
  //     return "Invalid Mobile Number";
  //   }
  // },

  // validatePassword: function validatePassword(password) {
  //   const passwordRegex =
  //     /^(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`]).{8,15}$/;

  //   if (!password) {
  //     return "Password is required";
  //   } else if (!passwordRegex.test(password)) {
  //     return "Invalid Password, It must be a 8-15 characters long, included at least number and special characters";
  //   }
  // },
  // validateOtherField: function validateOtherField(first_name, last_name) {
  //   if (!first_name) {
  //     return "First Name is required";
  //   } else if (!last_name) {
  //     return "Last Name is required";
  //   }
  // },
};

module.exports = { utils };
