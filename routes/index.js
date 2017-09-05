var express = require('express')
var router = express.Router()
var Promise = require('bluebird')
var AccountController = require('../controllers/AccountController')
var controllers = require('../controllers')

var serverapp = require('../public/build/es5/serverapp')
var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')
var Home = require('../public/build/es5/components/layout/Home')
var Account = require('../public/build/es5/components/containers/Account')
var ProfileInfo = require('../public/build/es5/components/layout/ProfileInfo')
var store = require('../public/build/es5/stores/store')


matchRoutes = function(req, routes, initialStore){
	return new Promise(function(resolve, reject){
		ReactRouter.match({routes, location:req.url}, function(error, redirectLocation, renderProps){
			if(error){
				reject(error)
				return
			}
			resolve(renderProps)
		})
	})
}

router.get('/', function(req, res, next) {
	var initialStore = null
	var reducers = {}

	AccountController.currentUser(req)

	.then(function(result){
		reducers['account'] = { // Populate store/reducer with current user:
			user: result,
			appStatus: 'ready'
		}

		// fetch zones
		return controllers.zone.get(null)
	})
	.then(function(zones){
		reducers['zone'] = {
			selectedZone: 0,
			list: zones,
			appStatus: 'ready'
		}
	})
	.then(function(){
		initialStore = store.configureStore(reducers)
		var routes = {
			path: '/',
			component: serverapp,
			initial: initialStore,
			indexRoute: {
				component: Account
			}
		}

		return matchRoutes(req, routes)
	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
		res.render('index', {react:html, preloadedState: JSON.stringify(initialStore.getState()) })
	})
	.catch(function(err, renderProps){

		console.log('Server Side Rendering Error: ' + err.message)
	})
})


router.get('/:page/:slug', function(req, res, next){
	var page = req.params.page
	var slug = req.params.slug

	var initialStore = null
	var reducers = {}

	if(page == 'api'){
		next()
		return
	}
	if(page=='account'){
		next()
		return
	}

	controllers.profile.get({username: slug})
	.then(function(profiles){
		var profile = profiles[0]
		var profileMap = {}
		profileMap[slug] = profile

		reducers['profile'] = {
			list: [profile],
			map: profileMap,
			appStatus: 'ready'
		}

		initialStore = store.configureStore(reducers)

		var routes = {
			path: '/profile/:username',
			component: serverapp,
			initial: initialStore,
			indexRoute: {
				component: ProfileInfo
			}
		}

		return matchRoutes(req, routes)
	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
	    res.render('index', { react: html, preloadedState: JSON.stringify(initialStore.getState()) })
	})
	.catch(function(err){

	})
})

router.get('/login',function(req, res, next){
	res.render('login', null)
})

router.get('/createzone', function(req, res, next) {
  res.render('createzone', null);
});

router.get('/createcomment', function(req, res, next) {
  res.render('createcomment', null);
});

module.exports = router;
