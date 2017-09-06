import constants      from '../constants/constants'
import { APIManager } from '../utils'

export default {

	commentsReceived: (comments, zone) => {
		return {
			type: constants.COMMENTS_RECEIVED,
			comments: comments,
			zone: zone
		}
	},

	// commentCreated: (comment) => {
	// 	return {
	// 		type: constants.COMMENT_CREATED,
	// 		comment: comment
	// 	}
	// },

	createComment: (comment) => {
		return(dispatch) => {
			dispatch({
				type: constants.APPLICATION_STATE,
				status: 'loading',
				reducer: 'comment'
			})

		APIManager.post('/api/comment', comment, (err, response)=>{
			if(err){
				alert(err)
				return
			}
			const comment = response.result
			dispatch({
					type: constants.COMMENT_CREATED,
					comment: comment
			})
		})
	}
},


	zoneCreated: (zone) => {
		return {
			type: constants.ZONE_CREATED,
			zone: zone
		}
	},

	selectZone: (index) => {
		return {
			type: constants.SELECT_ZONE,
			selectedZone: index
		}
	},

	currentUserReceived: (user) => {
		return{
			type: constants.CURRENT_USER_RECEIVED,
			user: user
		}
	},


	fetchCurrentUser: (params) => {
		return (dispatch) => {
			dispatch({
				type:constants.APPLICATION_STATE,
				status:'loading',
				reducer:'account'
			})

			APIManager.get('/account/currentuser', params, (err, response)=>{
	      if(err){
	      console.log('cannot get current user: ' + err.message)
	        return
	      }

				const user = response.result

				dispatch({
					type: constants.CURRENT_USER_RECEIVED,
					user: user
				})
			})

		}
	},

	currentUserUpdated: (user) => {
		return{
			type: constants.CURRENT_USER_UPDATED,
			user: user
		}
	},

	profileReceived: (profile) => {
		return{
			type: constants.PROFILE_RECEIVED,
			profile:profile
		}
	},

	fetchProfile: (params) => {
		return (dispatch) => {
			dispatch({
				type: constants.APPLICATION_STATE,
				status: 'loading',
				reducer: 'profile'
			})

			APIManager.get('/api/profile', params, (err, response) =>{
				if(err){
					console.log('error: '+ err)
					return
				}
				if(response.results.length == 0){
					alert('Profile Not Found')
				}
				const profile = response.results[0]

					dispatch({
							type: constants.PROFILE_RECEIVED,
							profile:profile
					})

			})
		}
	},

	fetchZone: (params) => {
		return (dispatch) => {

			dispatch({
				type: constants.APPLICATION_STATE,
				status: 'loading',
				reducer: 'zone'
			})

			APIManager.get('/api/zone', params, (err, response) =>{
				if(err){
					console.log('error: '+ err)
					return
				}
				const zones = response.results

					dispatch({
						type: constants.ZONES_RECEIVED,
						zones: zones
					})

			})
		}
	},
	createLogin: (params) => {
		return(dispatch)=>{
			dispatch({
				type: constants.APPLICATION_STATE,
				status: 'loading',
				reducer: 'account'
			})

			APIManager.post('/account/login', params, (err, response)=>{
				if(err){

					alert(err.message)
					return
				}

				const user = response.user
				// console.log("New User Actions: "+JSON.stringify(response.user))
				dispatch({
					type: constants.CURRENT_USER_RECEIVED,
					user: user
				})
				// console.log("Login: " + JSON.stringify(response))
				// this.props.currentUserReceived(response.user)
				// this.props.fetchCurrentUser(response.user)
			})
		}
	},

	createSignUp:(params) => {
		return (dispatch)=>{
			dispatch({
				type: constants.APPLICATION_STATE,
				appStatus: 'loading',
				reducer:'account'
			})

			APIManager.post('/account/register', params, (err, response)=>{
				if(err){
					alert('Username Taken. Choose another UserName')
					return
				}

				const user = response.user
				dispatch({
					type: constants.CURRENT_USER_RECEIVED,
					user: user
				})

			})
		}
	},

	updateComment:(comment, updated) => {
		return(dispatch) => {

			let endpoint = '/api/comment/'+ comment._id
			console.log("ACTIONS URL ENDPOINT VARIABLE: "+JSON.stringify(endpoint))
			console.log("ACTIONS UPDATED COMMENT: " + JSON.stringify(updated))
			APIManager.put(endpoint, updated, (err, response) => {
				if(err){
					alert('Comment not updated: ' + err.message)
					return
				}

				const newComment = response.result
				// console.log("Actions Response: "+ JSON.stringify(response.result))

				dispatch({
					type:constants.COMMENT_UPDATED,
					comment: newComment
				})
			})
		}
	},

	deleteComment:(comment) =>{
		return(dispatch)=>{
			let endpoint = 'api/comment/'+ comment._id
			APIManager.delete(endpoint, (err, response)=>{
				if(err){
					alert('Comment not deleted' + err.message)
					return
				}
				dispatch({
					type:constants.COMMENT_UPDATED
				})
			})
		}
	},

	updateProfile: (profile, updated) => {

		return (dispatch) => {
			console.log("UPdate Profile actions:" + JSON.stringify(profile))
				console.log("UPdate updated actions:" + JSON.stringify(updated))

			const endpoint = '/api/profile/'+profile._id
			APIManager.put(endpoint, updated, (err, response) => {
				if (err){
					alert('ERROR: '+JSON.stringify(err))
					return
				}

//				console.log('Profile Updated: '+JSON.stringify(response))
				const updatedProfile = response.result
				console.log('Profile Updated Actions: '+JSON.stringify(response.result))
				// dispatch({
				// 	type: constants.PROFILE_UPDATED,
				// 	profile: updatedProfile
				// })
			})
		}
	}
}
