const isAdmin = async (req, res, next) => {
  const user_uid = req.headers.user_uid;
  console.log("user_uid", user_uid);

  const user_exist = await _models.User.findOne({ user_uid });
  if (user_exist?.user_type !== "Admin" || user_exist?.user_type !== "admin") {
    return res.error("You can't access");
  }

  next();
};
module.exports = isAdmin;
