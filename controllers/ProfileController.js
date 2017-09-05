var Profile = require('../models/Profile')
var bcrypt  = require('bcryptjs')
var Promise = require('bluebird')


module.exports = {
	get: function(params){
		return new Promise(function(resolve, reject){
			Profile.find(params, function(err, profiles){
				if(err){
					reject(err)
					return
				}
				resolve(profiles)
			})
		})
	},

	find: function(params, callback){
		Profile.find(params, function(err, profiles){
			if (err){
				callback(err, null)
				return
			}

			callback(null, profiles)
		})
	},

	findById: function(id, callback){
		Profile.findById(id, function(err, profile){
			if (err){
				callback(err, null)
				return
			}

			callback(null, profile)
		})
	},

	create: function(params, callback){
		params['password'] = bcrypt.hashSync(params.password, 10)
		Profile.create(params, function(err, profile){

			if (err){
				callback(err, null)
				return
			}

			callback(null, profile)
		})

	},

	put: function(id, params, callback){
		Profile.findByIdAndUpdate(id, params, {new:true}, function(err, profile){
			if (err){
				callback(err, null)
				return
			}

			callback(null, profile)
		})
	},

	delete: function(id, callback){
		Profile.findByIdAndRemove(id, function(err){
			if (err){
				callback(err, null)
				return
			}

			callback(null, null)

		})
	}
}
