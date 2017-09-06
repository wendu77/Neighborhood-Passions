import constants from '../constants/constants'

var initialState = {
  user: null,
  appStatus:'ready'
}


export default (state=initialState, action) =>{
  var updated = Object.assign({}, state)
  switch(action.type){

    case constants.CURRENT_USER_RECEIVED:
      // console.log('CURRENT_USER_RECEIVED' + JSON.stringify(action.user))
      updated['user'] = action.user
      updated['appStatus'] = 'ready'
      return updated

    case constants.CURRENT_USER_UPDATED:
    updated['user'] = action.user
    // updated['appStatus'] = 'ready'
    return updated

    case constants.PROFILE_UPDATED:
    if (action.profile._id != updated.user._id)
				return updated

			updated['user'] = action.profile
			return updated

    case constants.APPLICATION_STATE:
		// console.log('APPLICATION_STATE: ' + JSON.stringify(action.status))
		if(action.reducer != 'account'){
			return updated
		}
		updated['appStatus'] = action.status
		return updated


    default:
    return state
  }
}
