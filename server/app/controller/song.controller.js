 const config = require('../../config/config');
const { Song } = require('../models')
const { Op } = require('Sequelize')

module.exports = {

  /* Registration controller */
	async index (req, res) {
		try{
			let allSongs = null;
			// getting the query in front of url
			const search = req.query.search
			if (search) {
				console.log(search)
				allSongs = await Song.findAll({
					where: {
						[Op.or]: [
							{
							  title: {
							  	[Op.like]: `%${search}%`
							  }
							},
							{
							  artist: {
							  	[Op.like]: `%${search}%`
							  }
							},
							{
							  album: {
							  	[Op.like]: `%${search}%`
							  }
							},
							{
							  genre: {
							  	[Op.like]: `%${search}%`
							  }
							}
						]
					}
				})
			}
			else {
				console.log("Hi there")
				allSongs = await Song.findAll({
					limit: 10
				})
			}
			
			res.send(allSongs)
		} catch(error) {
			res.status(400).send({
				error: `There is an error: ${error.message} `
			})
		}
		
	},

	async show (req, res) {
		try{
			console.log(req.params.songId)
			const aSong = await Song.findByPk(req.params.songId)
			res.send(aSong)
		} catch(error) {
			res.status(400).send({
				error: `There is an error: ${error.message} `
			})
		}
		
	},

	async postSong (req, res) {
		try{
			const songPosted = await Song.create(req.body)
			console.log('Kare Lai')
			res.send(songPosted.toJSON())
		} catch(error) {
			res.status(400).send({
				error: `There is an error: ${error.message} `
			})
		}
		
	},

	async edit (req, res) {
		try{
			const songEdited = await Song.update(req.body, {
				where: {
					id: req.params.songId
				}
			})
			res.send(req.body)
		} catch(error) {
			res.status(400).send({
				error: `There is an error: ${error.message} `
			})
		}
		
	}
	
}