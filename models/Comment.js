var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
	author:       { type: mongoose.Schema.Types.Mixed, default:{} },
	image:        { type: String, default: '' },
	commentImage: { type: String, default: '' },
	username:     { type: String, default: '' },
	zone:         { type: String, default: '' },
	title:        { type: String, default: '' },
	body:         { type: String, default: '' },
	timestamp:    { type: Date, default: Date.now }
})

module.exports = mongoose.model('CommentSchema', CommentSchema)
