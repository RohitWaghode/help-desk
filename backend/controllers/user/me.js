const me = async (req, res) => {
  const { user_uid } = req.headers;

  if (!user_uid || typeof user_uid !== "string") {
    return res.error("INVALID_UID");
  }

  try {
    const result = await _models.User.findOne({ user_uid });
    console.log(result);
    if (!result) {
      return res.error("User not found");
    }
    return res.success(result);
  } catch (error) {
    console.log(error);
    return res.error("Something went wrong");
  }
};
module.exports = me;
