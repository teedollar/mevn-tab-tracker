const { Users } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/config');


function jwtSignUser(user) {
	const ONE_WEEK = 60 * 60 * 24 * 7
	return jwt.sign(user, config.authentication.jwt_secret, {
    expiresIn: ONE_WEEK
  })
  
}

module.exports = {

  /* Registration controller */
	async registerUser (req, res) {
		try{
		    // HASHING PASSWORD
		    const salt = await bcrypt.genSalt(10)
		    const hashPaswword = await bcrypt.hash(req.body.password, salt)
		    req.body.password = hashPaswword

			const user = await Users.create(req.body)
			user.password = null;
			console.log(user.toJSON());
			res.send(user.toJSON()) 
		} catch(error) {
			res.status(400).send({
				error: `There is an error: ${error.message} `
			})
		}
		
	},
	/* Login user */

	async loginUser (req, res) {
		try{
			const {email, password} = req.body
			const user = await Users.findOne({
				where: {
					email: email
				}
			})
			if(!user){
				return res.status(403).send({
					error: "Invalid email or password"
				})
			}

			const isPasswordValid = await bcrypt.compare(password, user.password)
			if(!isPasswordValid){
				return res.status(403).send({
					error: "Invalid email or password"
				})
			}

			user.password = null;
	        const userJson = user.toJSON()
	        const userPayload = JSON.parse(JSON.stringify(user));
			res.send({
				user: userPayload,
				token: jwtSignUser(userPayload)
			}) 

		} catch(error) {
			res.status(500).send({
				error: `An error has occured trying to login: ${error.message} `
			})
		}
		
	}
}