const { Transaction } = require("../../models/transaction");

const fs = require("fs/promises");

const path = require("path");

const categoriesPath = path.join(__dirname, "../../models/categories.json");

function isExpense(amount, type) {
  if (!type) {
    return amount;
  }
  return 0;
}

const getTransaction = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { month, year } = req.query;

    const data = await Transaction.find(
      { owner, month, year },
      "-createdAt -updatedAt"
    ).populate("owner", "email, name");

    const catString = await fs.readFile(categoriesPath, "utf-8");
    const catArr = JSON.parse(catString);

    let catObj = {};

    catArr.forEach(({ id, name }) => {
      catObj = { ...catObj, [name]: 0 };
      return name;
    });

    let expenses = 0;
    let income = 0;

    data.forEach(({ type, amount, category }) => {
      if (!type) {
        const res = expenses + amount;
        expenses = res;
      }
      if (type) {
        const res = income + amount;
        income = res;
      }
      const total = catObj[category] + isExpense(amount, type);
      catObj[category] = total;
    });

    const cutResult = catArr.map(({ name, id }) => {
      return {
        id,
        name,
        total: catObj[name],
      };
    });

    res.json({ statistics: cutResult, income, expenses });
  } catch (error) {
    next(error);
  }
};

module.exports = getTransaction;
