const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/config');
const db = {};


const sequelize = new Sequelize(
	config.db.database,
	config.db.user,
	config.db.password,
	config.db.options

)

fs	/*Reading through*/
	.readdirSync(__dirname)     /*Read through the current directory i.e Models folder*/
	.filter((file) =>		   /*Read all the files found excluding index.js  i.e read all model files*/
		file !== 'index.js' 
	)
	.forEach((file) => {		/*Looping through all the files found*/
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes) 	/*Join the file with the directory path*/
		db[model.name] = model  	/*Set it  for instance: db.User = .....models/User.model.js>*/
	})

	/*The above is done instead of doing it manually one by one. E.g
	  db.User = require("...../models/User.model.js")(sequelize, Sequelize);
	*/

	/* sequelize must be synced at the entry point for connection e.g server.js*/


//For models association with one another.db

Object.keys(db).forEach(function (modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
