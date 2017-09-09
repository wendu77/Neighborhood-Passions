import React, { Component } from 'react'
import { CreateZone, Zone } from '../presentation'
import styles               from './styles'
import { APIManager }       from '../../utils'
import { connect }          from 'react-redux'
import actions              from '../../actions/actions'
import store                from '../../stores/store'

class Zones extends Component {
	constructor(){
		super()
		this.state = {

		}
	}

	componentDidMount(){
		// console.log('componentDidMount: '+JSON.stringify(this.props.user))
		this.props.fetchZone(null)
	}


	addZone(zone){
		if(this.props.user == null){
			swal({
					title:"Error!",
					text:"No Zone Entered",
					type: "error"
				})
			return
		}

		let updatedZone = Object.assign({}, zone)
		updatedZone['username']= this.props.user.username
			console.log('user: '+JSON.stringify(updatedZone))

		APIManager.post('/api/zone', updatedZone, (err, response) => {
			if (err){
				swal({
						title:"Error!",
						text:err.message,
						type: "error"
					})
				return
			}

			this.props.zoneCreated(response.result)
		})
		// this.props.createZone(updatedZone)
	}

	selectZone(index){
		// console.log('selectZone: '+index)
		// console.log('Hi current user: '+ this.props.user.username)
		// console.log('Hi zone user: '+ this.props.list[this.props.selected].username)
		this.props.selectZone(index)
	}

	render(){

	let header = null
	let listItems = null

	if(this.props.user !=null){
		 listItems = this.props.list.map((zone, i) => {
			let selected = (i==this.props.selected)
			return (
				<li className="text-uppercase" style={{marginTop:15}} role="presentation" key={i}>
					<Zone index={i} username={this.props.user.username} select={this.selectZone.bind(this)} isSelected={selected} currentZone={zone} />
				</li>


			)
		})


		// let update = (this.props.user.username == this.props.list[this.props.selected].username) ? "Button" : "NoButton"
		 header = 	<div>
			 						<div>
				 						<div className="card animated fadeInUp animation-delay-7" style={{backgroundColor: '#F8FAE3', border: '1px solid #FC2452', boxShadow: '0 2px 2px transparent'}}>
											<div className="card-header" style={{backgroundColor:'#FC2452', color: '#F8FAE3'}}>
												<h3 className="card-title text-uppercase">
													<i className="zmdi zmdi-apps"></i> Neighborhoods</h3>
											</div>
											<div className="tab-content">
				                <div role="tabpanel" className="tab-pane fade active in" id="favorite">
				                  <div className="card-block">
														<h6 className="text-uppercase text-center" style={{fontWeight: '300', color: '#FC2452'}}>Select Neighborhood to view comments</h6>
				                    <div className="ms-media-list">
															<ul className="text-uppercase" style={{listStyle:'none'}}>
																{listItems}
															</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div style={{background:'#F8FAE3'}}>
									<CreateZone  onCreate={this.addZone.bind(this)} />
								</div>
						</div>
	}else{
		header = <div>

						</div>
	}

		let content = (this.props.appStatus=='loading') ? 'Loading...' : header

		return (
			<div>
				{content}
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		list: state.zone.list,
		selected: state.zone.selectedZone,
		appStatus: state.zone.appStatus,
		user: state.account.user
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchZone: (params) => dispatch(actions.fetchZone(params)),
		// zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
		zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
		createZone: (params) => dispatch(actions.createZone(params)),
		selectZone: (index) => dispatch(actions.selectZone(index)),
	}
}

export default connect(stateToProps, dispatchToProps)(Zones)
