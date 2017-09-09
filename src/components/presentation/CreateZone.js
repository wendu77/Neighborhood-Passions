import React, { Component } from 'react'

class CreateZone extends Component {
	constructor(){
		super()
		this.clearValues=this.clearValues.bind(this)
		this.state = {

			zone: {
				username:''
			}
		}
	}

	updateZone(event){
		let updated = Object.assign({}, this.state.zone)
		updated[event.target.id] = event.target.value

		this.setState({
			zone: updated
		})
	}

	submitZone(event){

		let updated = Object.assign({}, this.state.zone)
		updated['zipCodes'] = updated.zipCode.split(',')
		this.props.onCreate(updated)
		this.clearValues()

	}

	clearValues(){
		this.refs.name.value=''
		this.refs.zip.value=''
		this.refs.description.value=''
	}


	render(){
		return (


			<div className="card animated fadeInUp animation-delay-7" style={{background:'#F8FAE3', border: '1px solid #FC2452', boxShadow: '0 2px 2px transparent'}}>
				<div className="card-header" style={{backgroundColor: '#FC2452', color: '#F8FAE3'}}>
					<h3 className="card-title text-uppercase">
						<i className="zmdi zmdi-widgets"></i> Create Neighborhood</h3>
				</div>
				<div className="card-block">

					<input style={{width:'75%',fontSize:'1.1em'}} id="name" placeholder="Enter Neighborhood Name" ref="name" onChange={this.updateZone.bind(this)} className="form-control text-uppercase" type="text" style={{color: '#FC2452'}}/>
					<input style={{width:'75%',fontSize:'1.1em'}} id="description" placeholder="Enter Neighborhood Description" ref="description" onChange={this.updateZone.bind(this)} className="form-control text-uppercase" type="text" style={{color: '#FC2452'}}/>
					<input style={{width:'75%',fontSize:'1.1em'}} placeholder="Enter Zip Code" id="zipCode" ref="zipCode" onChange={this.updateZone.bind(this)} className="form-control text-uppercase" type="text" ref="zip" style={{color: '#FC2452'}}/><br />
						<a onClick={this.submitZone.bind(this)} href="javascript:void(0)" className="btn btn-raised btn-block text-uppercase" style={{backgroundColor: '#FC2452', color: '#F8FAE3'}}>
							<i className="ml-1 no-mr zmdi zmdi-home"></i>&nbsp;&nbsp;Add New Neighborhood
						</a>
				</div>
			</div>

		)
	}
}

export default CreateZone
