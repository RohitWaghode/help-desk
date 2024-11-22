const listTicket = async (req, res) => {
  const { user_uid } = req.params;
  try {
    const result = await _models.Ticket.find(
      user_uid ? { user_uid: user_uid } : {}
    );
    return res.success(result);
  } catch (error) {
    return res.error("Something went wrong");
  }
};
module.exports = listTicket;
