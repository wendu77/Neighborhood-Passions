import React, { Component } from 'react'
import styles               from './styles'
import { Link }             from 'react-router'

class Zone extends Component {

	onSelectTitle(event){
		event.preventDefault()
		// console.log('onSelectTitle: '+this.props.index)
		this.props.select(this.props.index)
	}




	render(){

		const zoneStyle = styles.zone
		const zipCode = this.props.currentZone.zipCodes[0]

		const activeZone = (this.props.isSelected) ? <a style={{fontSize:'1.2em', color:'#ff0088'}} onClick={this.onSelectTitle.bind(this)} href="javascript:void(0)" className="media-heading">
			{this.props.currentZone.name}
		</a>:<a style={{fontSize:'1.2em'}} onClick={this.onSelectTitle.bind(this)} href="javascript:void(0)" className="media-heading">
			{this.props.currentZone.name}
		</a>

		const button = (this.props.currentZone.username == this.props.username) ? <Link to={'/updatezone/'+this.props.currentZone._id}> <button style={{marginTop:10}} className="btn btn-warning">Update Zone</button></Link> : null
		return (
			<div>
				<div className="media">
					<div className="media-left media-middle">
						<a onClick={this.onSelectTitle.bind(this)} href="#">
							<img className="media-object media-object-circle" src="/images/zonePin1.jpg" alt="..." /> </a>
					</div>
					<div className="media-body" style={{padding:'20px 0 0 10px', color: '#ff0088'}}>
					{activeZone}
						<p style={{color: '#000'}}>{this.props.currentZone.description}</p>
						{/*	<span className="detail">{this.props.currentZone.username}</span><br />*/}
						<div className="media-footer">
							<span className="mr-1" style={{color: '#ff0088'}}>
								<i className="zmdi zmdi-city-alt mr-05" style={{color: '#ff0088'}}></i> {zipCode}
								</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Zone
