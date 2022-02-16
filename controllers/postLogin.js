const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const postLogin = async (req, res) => {
    
    try {
        const {mail, password} = req.body

        const user = await User.findOne({mail: mail.toLowerCase()})

        if(user && (await bcrypt.compare(password, user.password))) {
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
             return res.status(200).json({
                 userDetails: {
                     mail: user.mail,
                     token,
                     userName: user.userName
                 },
             });
    
        }
          return res.status(400).send('Invalid credentials. Please try again');
    } catch (error) {
       return res.status(500).send('Something went wrog.');
       
    }

};

module.exports = postLogin;
