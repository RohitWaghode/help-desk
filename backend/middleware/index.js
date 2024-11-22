const isAdmin = async (req, res, next) => {
  const user_uid = req.headers.user_uid;

  const user_exist = await _models.User.findOne({ user_uid });

  if (user_exist?.user_type !== "Admin") {
    return res.error("You can't access");
  }

  next();
};
module.exports = isAdmin;
