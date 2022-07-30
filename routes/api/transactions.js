const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/transactions");
const { ctrlWrapper } = require("../../services");
const validation = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authenticate");


router.post("/create",authenticate, validation(),ctrlWrapper(ctrl.createTransaction) )

module.exports = router;