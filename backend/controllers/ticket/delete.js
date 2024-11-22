const deleteTicket = async (req, res) => {
  const filter = { ticket_id: req.params.ticket_id };

  try {
    const ticket_exist = await _models.Ticket.findOne(filter);
    if (!ticket_exist) {
      return res.error("Ticket deleted already");
    }
    const delete_ticket = await _models.Ticket.deleteOne(filter);
    if (!delete_ticket) {
      return res.error("Ticket not found");
    }
    return res.success("Ticket deleted successfully");
  } catch (error) {
    return res.error("Something went wrong");
  }
};
module.exports = deleteTicket;
