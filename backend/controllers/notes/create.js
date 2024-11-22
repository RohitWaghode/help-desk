const createNotes = async (req, res) => {
  const { ticket_id, user_uid, notes } = req.body;

  if (!ticket_id) {
    return res.error("Ticket Id is required");
  } else if (!user_uid) {
    return res.error("User UID is required");
  } else if (!notes) {
    return res.error("Notes is required");
  }
  try {
    const ticket_id_exist = await _models.Ticket.findOne({
      ticket_id,
    });
    if (!ticket_id_exist) {
      return res.error("Ticket id not found");
    }

    const user_uid_exist = await _models.User.findOne({ user_uid });
    if (!user_uid_exist) {
      return res.error("User not found");
    }
    const notes = await _models.Notes.create(req.body);
    return res.success(notes);
  } catch (error) {
    return res.error("Something went wrong");
  }
};

module.exports = createNotes;
