const editNotes = async (req, res) => {
  const filter = { ticket_id: req.params.ticket_id };
  const { ticket_id, user_uid, notes } = req.body;

  if (!ticket_id) {
    return res.error("Ticket Id is required");
  } else if (!user_uid) {
    return res.error("User UID is required");
  } else if (!notes) {
    return res.error("Notes is required");
  }

  if (!filter) {
    return res.error("Ticket id is required");
  }

  try {
    const edit_notes = await _models.Notes.findOneAndUpdate(filter, req.body, {
      new: true,
    });
    if (!edit_notes) {
      return res.error("Ticket not found");
    }
    return res.success(edit_notes);
  } catch (error) {
    return res.error("Something went wrong");
  }
};

module.exports = editNotes;
