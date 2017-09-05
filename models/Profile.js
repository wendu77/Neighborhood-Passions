var mongoose = require('mongoose')

var ProfileSchema = new mongoose.Schema({
	firstName:  { type: String, default: '' },
	lastName:   { type: String, default: '' },
    username:   { type: String, unique: true, default: '' },
    password:   { type: String, default: '' },
    image:      { type: String, default: '' },
    gender:     { type: String, default: '' },
    city:       { type: String, default: '' },
    bio:        { type: String, default: '' },
    timestamp:  { type: Date,   default: Date.now },
})

module.exports = mongoose.model('ProfileSchema', ProfileSchema)
