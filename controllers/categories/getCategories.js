const fs = require("fs/promises");
const path = require("path");

const categoriesPath = path.join(__dirname, "../../models/categories.js");

const getCetegories = async () => {
  const contacts = await fs.readFile(categoriesPath, "utf-8");
  return JSON.parse(contacts);
};

module.exports = {
  getCetegories,
};
