var ZoneController    = require('./ZoneController')
var CommentController = require('./CommentController')
var ProfileController = require('./ProfileController')
var AccountController = require('./AccountController')

module.exports = {
	comment: CommentController,
	zone:    ZoneController,
	profile: ProfileController,
	account: AccountController
}
