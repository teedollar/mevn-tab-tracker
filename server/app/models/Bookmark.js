module.exports = (sequelize, DataTypes) => {
	const Bookmark = sequelize.define('Bookmark', {});

	Bookmark.associate = function (models) {
		Bookmark.belongsTo(models.Users)
		Bookmark.belongsTo(models.Song)
	}

	return Bookmark;
}