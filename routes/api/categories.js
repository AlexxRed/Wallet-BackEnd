const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/categories/getCategories");
const { ctrlWrapper } = require("../../services");
const authenticate = require("../../middlewares/authenticate");

router.get("/categories", authenticate, ctrlWrapper(ctrl.getCetegoriest));

module.exports = router;
