const path = require("path");

const getFile = async (req, res) => {
  const { filename } = req.params;

  try {
    const filePath = path.join("uploads", filename);
    return res.download(filePath, (err) => {
      if (err) {
        return res.error("File not found!");
      }
    });
  } catch (err) {
    return res.error("Something went wrong");
  }
};

module.exports = getFile;
