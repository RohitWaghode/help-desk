const replyNotes = async (req, res) => {
  const { ticket_id } = req.params;
  const { user_uid, reply_by, notes } = req.body;

  if (!ticket_id) {
    return res.error("Ticket Id is required");
  }
  if (!user_uid) {
    return res.error("user_uid  is required");
  }
  if (!reply_by) {
    return res.error("reply_by  is required");
  }
  if (!notes) {
    return res.error("notes  is required");
  }

  try {
    const result = await _models.Notes.create({
      ticket_id,
      user_uid,
      reply_by,
      notes,
    });
    return res.success(result);
  } catch (err) {
    return res.error("Something went wrong");
  }
};

module.exports = replyNotes;
