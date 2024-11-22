const listTicket = async (req, res) => {
  const { user_uid } = req.query;
  try {
    const result = await _models.Ticket.find(
      user_uid ? { user_uid: user_uid } : {}
    ).sort({ created_at: -1 });
    return res.success(result);
  } catch (error) {
    return res.error("Something went wrong");
  }
};
module.exports = listTicket;
