const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {

    try {
        const { userName, password, mail } = req.body;

        const userExist = await User.exists({mail})
        if(userExist) {
             return res.status(409).send('Email is already use.');
        }

        //encrypted password
        const encryptedPassword = await bcrypt.hash(password, 10)


        const user = await User.create({
            userName,
            mail: mail.toLowerCase(),
          password: encryptedPassword
        })

        const token = jwt.sign(
            {
                userId: user._id,
                mail,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );

        res.status(201).json({
          userDetails: {
              mail: user.mail,
              token,
              userName: user.userName
          }  
        })

    } catch (error) {
        return res.status(500).send('Error occured. Please try latter.')
        
    }
};

module.exports = postRegister;