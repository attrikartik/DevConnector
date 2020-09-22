const express = require('express');
const router = express.Router();

const userValidations = require('../../middleware/validations');
const userController = require('../../controllers/users');
/**
 *  @Route POST api/users
 *  @desc  Register user & get Token
 *  @access PUBLIC
 */
router.post('/',userValidations.registerUser(),userController.registerUser);



module.exports = router;    

