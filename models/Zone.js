var mongoose = require('mongoose')

var ZoneSchema = new mongoose.Schema({
	username:    { type: String, default: '' },
	name:        { type: String, default: '' },
	description: { type: String, default: '' },
	zipCodes:    { type: Array,  default: [] },
	timestamp:   { type: Date,   default: Date.now }
})

module.exports = mongoose.model('ZoneSchema', ZoneSchema)
