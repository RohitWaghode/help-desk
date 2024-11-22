const createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    email_address,
    mobile_number,
    password,
    user_type,
  } = req.body;

  if (!first_name) {
    return {
      code: "First_Name_Error",
      field: "first_name",
      message: "First Name is required",
    };
  } else if (!last_name) {
    return {
      code: "Last_Name_Error",
      field: "last_name",
      message: "Last Name is required",
    };
  } else if (!email_address) {
    return {
      code: "Email_Address_Error",
      field: "email_address",
      message: "Email Address is required",
    };
  } else if (!mobile_number) {
    return {
      code: "Mobile_Number_Error",
      field: "mobile_number",
      message: "Mobile Number is required",
    };
  } else if (!password) {
    return {
      code: "Password_Error",
      field: "password",
      message: "Password is required",
    };
  } else if (!user_type) {
    return {
      code: "User_Type_Error",
      field: "user_type",
      message: "User Type is required",
    };
  }

  const adminObj = {};

  if (req.headers?.admin_key !== "@jlfhjlglguGL#") {
    return res.error("INVALID_ACCESS");
  }

  try {
    const email_exist = await _models.User.findOne({ email_address });
    if (email_exist) {
      return res.error("Email already exist ");
    }
    adminObj.email_address = email_address;

    const mobile_exist = await _models.User.findOne({ mobile_number });
    if (mobile_exist) {
      return res.error("Mobile number already exist");
    }
    adminObj.mobile_number = mobile_number;
    adminObj.password = password;
    adminObj.first_name = first_name;
    adminObj.last_name = last_name;
    adminObj.user_type = user_type;

    const user = await _models.User.create(adminObj);

    return res.success(user);
  } catch (error) {
    console.log(error);
    return res.error("Something went wrong");
  }
};

module.exports = createUser;
