const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/transactions");
const { ctrlWrapper } = require("../../services");
const validation = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authenticate");
const { joiCreateTransaction } = require("../../models/transaction");

router.post(
  "/create",
  authenticate,
  validation(joiCreateTransaction),
  ctrlWrapper(ctrl.createTransaction)
);

router.get("/", authenticate, ctrlWrapper(ctrl.getTransaction));
router.get("/filter", authenticate, ctrlWrapper(ctrl.filterTransaction));

module.exports = router;
