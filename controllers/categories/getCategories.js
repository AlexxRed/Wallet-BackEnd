const fs = require("fs/promises");
const path = require("path");

const categoriesPath = path.join(__dirname, "../../models/categories.json");

const getCategories = async (req, res, next) => {
  const result = await fs.readFile(categoriesPath, "utf-8");
  const jsonResult = JSON.parse(result);
  res.json([...jsonResult]);
};

module.exports = getCategories;
