const { Transaction } = require("../../models/transaction");

const getTransaction = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const start = (page - 1) * limit;
    const end = page * limit;

    // const result = await Transaction.find(
    //   { owner },
    //   "-createdAt -updatedAt",
    //   {
    //     skip,
    //     limit: Number(limit),
    //   }
    // ).populate("owner", "email, name");

    const allData = await Transaction.find({ owner });

    const totalPages = Math.ceil(allData.length / limit);

    const transactions = await Transaction.find(
      { owner },
      "-createdAt -updatedAt"
    ).populate("owner", "email, name");

    const sortTransactions = transactions.map((transaction) => {
      const filter = new Date(transaction.date).getTime();
      return { ...transaction._doc, filter };
    });

    const sorTransactions = sortTransactions.sort((a, b) => {
      return b.filter - a.filter;
    });

    const result = sorTransactions.slice(start, end);

    const obj = {
      totalPages,
      data: result.reverse()
    };
    
    res.json(obj);
  } catch (error) {
    next(error);
  }

};

module.exports = getTransaction;


//   const getTransactions = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const data = await Transaction.listTransactions(userId, req.query);
//     return res.json({
//       status: "success",
//       code: HttpCode.OK,
//       data: { ...data },
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// };