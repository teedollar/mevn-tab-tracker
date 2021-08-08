const { index, postBookmark, deleteBookmark } = require('../app/controller/Bookmark.controller');
const router = require('express').Router();
const isAuthenticated = require('../app/policies/isAuthenticated')

router.get('/', isAuthenticated, index) 
router.post('/', isAuthenticated, postBookmark) 
router.delete('/:bookmarkId', isAuthenticated, deleteBookmark) 

module.exports = router;