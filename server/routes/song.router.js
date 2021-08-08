const { index, postSong, show, edit } = require('../app/controller/song.controller');
const router = require('express').Router();
const isAuthenticated = require('../app/policies/isAuthenticated')

router.get('/', isAuthenticated, index) /* get all songs */
router.get('/:songId', isAuthenticated, show) /* show a song */
router.post('/post', isAuthenticated, postSong) /* create a song */
router.put('/:songId', isAuthenticated, edit) /* edit a song */

module.exports = router;