const editUser = async (req, res) => {
  const filter = { user_uid: req.params.user_uid };
  const {
    first_name,
    last_name,
    email_address,
    mobile_number,
    password,
    user_type,
  } = req.body;

  if (!first_name) {
    return res.error("First Name is required");
  } else if (!last_name) {
    return res.error("Last Name is required");
  } else if (!email_address) {
    return res.error("Email Address is required");
  } else if (!mobile_number) {
    return res.error("Mobile Number is required");
  } else if (!password) {
    return res.error("Password is required");
  } else if (!user_type) {
    return res.error("User Type is required");
  }

  try {
    const update_user = await _models.User.findOneAndUpdate(filter, req.body, {
      new: true,
    });

    if (!update_user) {
      return res.error("User Not Found");
    }
    return res.success(update_user);
  } catch (error) {
    console.log(error);
    return res.error("Something went wrong");
  }
};

module.exports = editUser;
