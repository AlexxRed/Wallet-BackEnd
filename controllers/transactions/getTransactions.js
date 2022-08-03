const { Transaction } = require("../../models/transaction");

const getTransaction = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Transaction.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email, name");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getTransaction;
