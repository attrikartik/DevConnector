const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const validation = require("../../middleware/validations");
const authController = require("../../controllers/auth");

/**
 *  @Route GET api/auth
 *  @desc Get User
 *  @access PUBLIC
 */
router.get("/", auth, authController.getUser);

/**
 *  @Route POST api/auth ( LogIn )
 *  @desc  Authenticate User & get Token
 *  @access PUBLIC
 */
router.post("/", validation.loginUser(), authController.LoginUser);

module.exports = router;
