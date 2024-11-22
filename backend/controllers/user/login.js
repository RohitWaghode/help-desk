const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkeyappearshere";

const loginUser = async (req, res) => {
  const { email_address, password } = req.body;

  if (!email_address) {
    return res.error("Email address is required");
  } else if (!password) {
    return res.error("Password is required");
  }

  try {
    const isEmail = await _models.User.findOne({ email_address });

    if (!isEmail) {
      return res.error("Invalid Email address");
    }

    const password_is_match = bcrypt.compare(password, isEmail?.password);
    if (!password_is_match) {
      return res.error("password is incorrect");
    }

    const token = jwt.sign(
      { user_uid: isEmail?.user_uid, email_address: isEmail?.email_address },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const hours_expire = 7 * 24;
    const valid_till_date = new Date(
      Date.now() + hours_expire * 60 * 60 * 1000
    );
    const valid_record = await _models.AuthToken.create({
      user_uid: isEmail?.user_uid,
      user_type: isEmail?.user_type,
      validate_till: valid_till_date,
    });
    if (!valid_record) {
      return res.success("Invalid Auth Token");
    }
    return res.success({
      token,
      user_uid: isEmail?.user_uid,
      user_type: isEmail?.user_type,
    });
  } catch (error) {
    console.log(error);
    return res.error("Something wents wrong");
  }
};

module.exports = loginUser;
