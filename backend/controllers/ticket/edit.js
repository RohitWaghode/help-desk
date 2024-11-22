const editTicket = async (req, res) => {
  const filter = { ticket_id: req.params.ticket_id };
  const { status } = req.body;
  const { user_type } = req.headers;

  if (user_type === "user") {
    res.error("You do not have permission to edit this ticket");
  }

  if (!status) {
    return res.error("Status is required");
  }

  try {
    const ticket = await _models.Ticket.findOne(filter);
    if (!ticket) {
      return res.error("Ticket not found");
    }

    if (user_type === "agent" && ticket?.status === "closed") {
      return res.error("You don't have a access");
    }

    const update_ticket = await _models.Ticket.findOneAndUpdate(
      filter,
      { status },
      { new: true }
    );
    return res.success(update_ticket);
  } catch (error) {
    console.log(error);
    return res.error("Something went wrong");
  }
};

module.exports = editTicket;
