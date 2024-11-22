const listNotes = async (req, res) => {
  const { ticket_uid } = req.params;
  try {
    const list_notes = await _models.Notes.find(
      ticket_uid ? { ticket_id: ticket_uid } : {}
    );
    if (!list_notes) {
      return res.error("Notes not found");
    }
    return res.success(list_notes);
  } catch (error) {
    return res.error("Something went wrong");
  }
};

module.exports = listNotes;
