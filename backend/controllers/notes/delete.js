const deleteNotes = async (req, res) => {
  const filter = { ticket_id: req.params.ticket_id };

  try {
    const notes_exist = await _models.Notes.findOne(filter);
    if (!notes_exist) {
      return res.error("Ticket deleted already");
    }
    const delete_notes = await _models.Notes.deleteOne(filter);
    if (!delete_notes) {
      return res.error("Ticket id not found");
    }
    return res.success("Ticket deleted successfully");
  } catch (error) {
    return res.error("Something went wrong");
  }
};

module.exports = deleteNotes;
