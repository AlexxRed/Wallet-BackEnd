const { Transaction } = require("../../models/transaction")

const createTransaction = async (req, res) => {
    const {_id:owner} = req.user
    await Transaction.create({...req.body, owner});
    res.status(201).json();
};

module.exports = createTransaction