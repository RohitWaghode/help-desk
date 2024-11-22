const listUser = async (req, res) => {
  try {
    const result = await _models.User.find();
    console.log("result", result);
    return res.success(result);
  } catch (error) {
    console.log(error);
    return res.error("Something went wrong");
  }
};

module.exports = listUser;
