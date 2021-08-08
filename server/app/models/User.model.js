module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('Users', {
		email: {
			type: DataTypes.STRING,
			unique: true
		},

		password: DataTypes.STRING
	});
	return User;
}