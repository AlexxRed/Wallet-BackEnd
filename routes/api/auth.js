const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../services");
const validation = require("../../middlewares/validationUser");
const authenticate = require("../../middlewares/authenticate");

const { joiUserRegisterSchema,
        joiUserLoginSchema
} = require("../../models/user");



router.post("/users/signup", validation(joiUserRegisterSchema), ctrlWrapper(ctrl.register));

router.post("/users/login", validation(joiUserLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

module.exports = router