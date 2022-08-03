const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/categories");
const { ctrlWrapper } = require("../../services");
const authenticate = require("../../middlewares/authenticate");

router.get("/categories", authenticate, ctrlWrapper(ctrl.getCategories));

module.exports = router;
