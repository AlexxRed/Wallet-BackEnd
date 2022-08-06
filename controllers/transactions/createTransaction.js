const { Transaction } = require("../../models/transaction")

const createTransaction = async (req, res) => {
    const { _id: owner } = req.user
    console.log(req.body);
    await Transaction.create({...req.body, owner});
    res.status(201).json();
};

module.exports = createTransaction