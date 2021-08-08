const { registerUser, loginUser } = require('../app/controller/user.controller');
const { registerUserPolicy } = require('../app/policies/AuthControllerPolicy');
const router = require('express').Router();

router.post('/register', registerUserPolicy, registerUser) /* Register route */
router.post('/login', loginUser) /* Login route */

module.exports = router;