const express = require('express')
const router = express.Router()
const  authRegister  = require('../controllers/authRegister');
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const verifyToken = require('../middleware/auth')


const registerSchema = Joi.object({
    userName: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    mail: Joi.string().email().required()
})

const loginSchema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    mail: Joi.string().email().required(),
});

router.post('/register', validator.body(registerSchema), authRegister.controllers.postRegister);

router.post(
    '/login',
    validator.body(loginSchema),
    authRegister.controllers.postLogin,
);

router.get('/test', verifyToken, (req, res) => {
    res.send('Hi')
})

module.exports = router
