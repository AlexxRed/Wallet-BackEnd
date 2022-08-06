const { Transaction } = require("../../models/transaction");
const { User } = require("../../models/user");

const createTransaction = async (req, res) => {
  const { _id: owner, balance } = req.user;
  const { amount, type } = req.body;

  await Transaction.create({ ...req.body, owner });
  let newBalance;

  if (type) {
    newBalance = balance + amount;
  }
  if (!type) {
    newBalance = balance + amount;
  }
  await User.findByIdAndUpdate(owner, { balance: newBalance });

  res.status(201).json({ ...req.body, owner, balance: newBalance });
};

module.exports = createTransaction;
