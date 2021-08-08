module.exports = {
	port: process.env.APP_PORT,

	db: {
		database: process.env.database || 'tabtracker',
		user: process.env.user || 'root',
		password: process.env.password || '',
		options: {
			dialect: process.env.dialect || 'mysql',
			host: process.env.host
		}
	},

	authentication: {
		jwt_secret: process.env.secret ||   'adetayo-sec-ret'
	}
};