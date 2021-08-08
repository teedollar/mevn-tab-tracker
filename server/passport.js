const passport = require('passport')
const config = require('./config/config')
const { Users } = require('./app/models')
// Importing the strategies
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
	new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: config.authentication.jwt_secret
	}, async function (jwtPayload, done) {
		try {
			const user = await Users.findOne({
				where: {
					id: jwtPayload.id
				}
			})
			if (!user) {
				return done(new Error(), false)
			}
			return done(null, user)
		} catch (err) {
			return done(new Error(), false)
		}
	})
)

module.exports = null