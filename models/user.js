const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    token: {
      type: String,
      default: "",
    },
    balance: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const joiUserRegisterSchema = Joi.object({
  name: Joi.string().min(1).max(12).required(),
  email: Joi.string()
    .min(10)
    .max(63)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .pattern(emailRegexp),
  password: Joi.string().min(6).max(16),
  repeat_password: Joi.ref("password"),
  balance: Joi.number(),
});

const joiUserLoginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(8),
});

module.exports = {
  User,
  joiUserRegisterSchema,
  joiUserLoginSchema,
};
