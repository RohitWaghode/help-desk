const listNotes = async (req, res) => {
  try {
    const list_notes = await _models.Notes.find();
    if (!list_notes) {
      return res.error("Notes not found");
    }
    return res.success(list_notes);
  } catch (error) {
    return res.error("Something went wrong");
  }
};

module.exports = listNotes;
