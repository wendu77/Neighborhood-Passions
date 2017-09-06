var express           = require('express')
var router            = express.Router()
var ProfileController = require('../controllers/ProfileController')
var AccountController = require('../controllers/AccountController')
var bcrypt            = require('bcryptjs')


router.get('/:action', function(req, res, next){
    var action = req.params.action


    if(action == 'logout'){
      req.session.reset()
      res.json({
        confirmation:'success',
        message: 'User Logged Out'
      })
    }
    if(action == 'currentuser'){
			AccountController.currentUser(req)
			.then(function(result){
				res.json({
					confirmation:'success',
					result: result
				})
			})
			.catch(function(err){
				res.json({
					confirmation:'fail',
					message: err.message
				})
			})
    }
})

router.post('/:action', function(req, res, next){
  console.log('backend')
    var action = req.params.action


    if(action=='register'){
      ProfileController.create(req.body, function(err, result){
        if(err){
          res.json({
            confirmation: 'fail',
            message: err
          })
          return
        }


        req.session.user = result._id
        res.json({
          confirmation:'success',
          user: result
        })
      })
    }


    if(action =='login'){
      var params = {username: req.body.username}
      ProfileController.find(params, function(err, results){
        if(err){
          res.json({
            confirmation:'fail',
            message: err.message
          })
          return
        }
      if(results.length==0){
        res.json({
          confirmation:'fail',
          message: 'username does not exist'
        })
        return
      }
      var profile = results[0]
      var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
        if(isPasswordCorrect==false){
          res.json({
            confirmation: 'fail',
            message: 'password incorrect'
          })
          return
        }
        req.session.user = profile._id

        res.json({
          confirmation: 'success',
          user: profile
        })
      })
    }

})

router.put('/:resource/:id', function(req,res,next){
  var resource = req.params.resource
  var controller = controllers[resource]
  var id = req.params.id

  ProfileController.put(id, req.body, function(err, result){
    console.log("Req.body: " + JSON.stringify(req.body))
    if(err){
      res.json({
        confirmation:'fail',
        message: err
      })
      return
    }
    res.json({
      confirmation:'success',
      result: result
    })
    return
  })
})

router.delete('/:resource/:id', function(req, res, next){
  var resource = req.params.resource
  var controller = controllers[resource]
  var id = req.params.id


  ProfileController.findByIdAndRemove(id, function(err){
    if(err){
      res.json({
        confirmation:'fail',
        message: err
      })
      return
    }
    res.json({
      confirmation:'success',
      result: result
    })
    return
  })
})



module.exports = router
