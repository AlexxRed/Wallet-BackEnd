const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      set: (data) => Number(data),
    },
    type: {
      type: Boolean ,
      enum: [true , false],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
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
