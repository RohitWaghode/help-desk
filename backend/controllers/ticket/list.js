const listTicket = async (req, res) => {
  try {
    const result = await _models.Ticket.find();
    return res.success(result);
  } catch (error) {
    return res.error("Something went wrong");
  }
};
module.exports = listTicket;
