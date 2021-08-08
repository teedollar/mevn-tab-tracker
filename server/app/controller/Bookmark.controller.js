const config = require('../../config/config');
const { Bookmark, Song } = require('../models')
const { Op } = require('Sequelize')

module.exports = {

  /* Registration controller */
	async index (req, res) {
		try{
			let bookmarks = null;
			const userId = req.users.id // Gotten from req.user set in isAuthenticated policy
			// getting the query in front of url e.g ?songId=3
			console.log('User ID: ', userId)
			const { songId } = req.query
			const where = {
				UserId: userId
			}
			if(songId){
				where.SongId = songId
			}
			bookmarks = await Bookmark.findAll({
				where: where,
				include: [
					{
						model: Song
					}
				]
			})
			res.send(bookmarks)
		} catch(error) {
			res.status(400).send({
				error: `There is an error: ${error.message}`
			})
		}
		
	},

	async postBookmark (req, res) {
		try{
			const userId = req.users.id
			const { songId } = req.body
			const bookmark = await Bookmark.findOne({
				where: {
					UserId: userId,
					SongId: songId
				}
			})
			if (bookmark) {
				return res.status(400).send({
					error: 'You have already bookmarked this song'
				})
			}

			const newBookmark = await Bookmark.create({
				SongId: songId,
				UserId: userId
			})
			res.send(newBookmark.toJSON())
		} catch(error) {
			res.status(400).send({
				error: `Error dey: ${error.message} `
			})
		}
		
	},

	async deleteBookmark (req, res) {
		try{
			const { bookmarkId } = req.params
			// const bookmarkId =BID 1
			const bookmark = await Bookmark.findByPk(bookmarkId)
			await bookmark.destroy()
			res.send(bookmark.toJSON())
		} catch(error) {
			res.status(400).send({
				error: `There is an error: ${error.message} `
			})
		}
		
	}
	
}