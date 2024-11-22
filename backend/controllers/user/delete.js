const deleteUser = async (req, res) => {
  const filter = { user_uid: req.params.user_uid };

  try {
    const user_exist = await _models.User.findOne(filter);
    if (!user_exist) {
      return res.error("User already deleted");
    }
    const result = await _models.User.deleteOne(filter);
    if (!result) {
      return res.error("User Not Found");
    }
    return res.success("User deleted successfully");
  } catch (error) {
    console.log(error);
    return res.error("Something went wrong");
  }
};

module.exports = deleteUser;
