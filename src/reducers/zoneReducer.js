import constants from '../constants/constants'

var initialState = {
	selectedZone: 0,
	list: [],
	map:{},
	appStatus: 'ready'
}

export default (state = initialState, action) => {

	var updated = Object.assign({}, state)
	switch (action.type) {

		case constants.ZONES_RECEIVED:
			// console.log('ZONES_RECEIVED: '+JSON.stringify(action.zones))
			updated['list'] = action.zones
			updated['appStatus'] = 'ready'
			return updated // this is the equivalent of this.setState(...)

		case constants.ZONE_CREATED:
			// console.log('ZONE_CREATED: '+JSON.stringify(action.zone))

			let updatedList = Object.assign([], updated.list)
			updatedList.push(action.zone)
			updated['list'] = updatedList
			// console.log("updated zone list: " + JSON.stringify(updated))
			// updated['appStatus'] = 'ready'
			return updated

		case constants.SELECT_ZONE:
			updated['selectedZone'] = action.selectedZone
			// console.log('selectzone: ' + JSON.stringify(updated))
			return updated

		case constants.APPLICATION_STATE:
		// console.log('APPLICATION_STATE: ' + JSON.stringify(action.status))
		if(action.reducer != 'zone'){
			return updated
		}
		updated['appStatus'] = action.status
		return updated

		default:
			return state

	}


}
