const { Transaction } = require("../../models/transaction");

const getTransaction = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { month, year } = req.query;

    const result = await Transaction.find(
      { owner, month, year },
      "-createdAt -updatedAt"
    ).populate("owner", "email, name");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getTransaction;
