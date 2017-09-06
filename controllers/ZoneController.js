var Zone = require('../models/Zone')

module.exports = {

	get: function(params){
		return new Promise(function(resolve, reject){
			Zone.find(params, function(err, zones){
				if(err){
					reject(err)
					return
				}
				resolve(zones)
			})
		})
	},

	find: function(params, callback){
		Zone.find(params, function(err, zones){
			if (err){
				callback(err, null)
				return
			}

			callback(null, zones)
		})
	},

	findById: function(id, callback){
		Zone.findById(id, function(err, zone){
			if (err){
				callback(err, null)
				return
			}

			callback(null, zone)
		})
	},

	create: function(params, callback){

//		params['zipCodes'] = newZips
		Zone.create(params, function(err, zone){
			if (err){
				callback(err, null)
				return
			}

			callback(null, zone)
		})

	},

	put: function(id, params, callback){
		Zone.findByIdAndUpdate(id, params, {new:true}, function(err, zone){
			if (err){
				callback(err, null)
				return
			}

			callback(null, zone)
		})
	},

	delete: function(id, callback){
		Zone.findByIdAndRemove(id, function(err){
			if (err){
				callback(err, null)
				return
			}

			callback(null, null)

		})
	}
}
