const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      require: true,
      set: (data) => Number(data),
    },
    type: {
      type: Boolean ,
      enum: [true , false],
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    month: {
      type: Number,
      require: true,
    },
    year: {
      type: Number,
      require: true,
    },
    balance: {
      type: Number,
    },
    comment: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Transaction = model("transaction", transactionSchema);

const joiCreateTransaction = Joi.object({
  amount: Joi.number().required(),
  date: Joi.date().required(),
  category: Joi.boolean().required(),
  comment: [Joi.string(), Joi.number()],
  type: Joi.string().required(),
});

module.exports = {
  Transaction,
  joiCreateTransaction,
};
