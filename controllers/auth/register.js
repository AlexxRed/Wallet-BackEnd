const { User } = require("../../models/user");
const { createError } = require("../../services");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 15);
  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: result.email,
      name: result.name,
    },
  });
};

module.exports = register;
