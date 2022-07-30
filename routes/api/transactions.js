const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/transactions");
const { ctrlWrapper } = require("../../services");
const validation = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authenticate");
const {joiCreateTransaction} = require("../../models/transaction")


router.post("/create",authenticate, validation(joiCreateTransaction),ctrlWrapper(ctrl.createTransaction) )

module.exports = router;