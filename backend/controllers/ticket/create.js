const createTicket = async (req, res) => {
  const { title, customer_name } = req.body;
  const filter = { user_uid: req.params.user_uid };

  if (!title) {
    return res.error("Title is required");
  } else if (!customer_name) {
    return res.error("Customer name is required");
  }

  try {
    const user_exist = await _models.User.findOne(filter);
    if (!user_exist) {
      return res.error("User not found");
    }
    const ticket = await _models.Ticket.create({
      title,
      customer_name,
      status: "pending",
    });
    return res.success(ticket);
  } catch (error) {
    console.log(error);
    return res.error("Something went wrong");
  }
};

module.exports = createTicket;
