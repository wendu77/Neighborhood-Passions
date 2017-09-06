import React, { Component } from 'react'
import { APIManager}        from '../../utils'
import styles               from './styles'
import { connect }          from 'react-redux'
import actions              from '../../actions/actions'
import { Link }             from 'react-router'


class UpdateZone extends Component{

  componentDidMount(){

    this.props.fetchZone(null)
      console.log('update zone list: ' + JSON.stringify(this.props.list))
      console.log('selected zone: ' + JSON.stringify(this.props.selected))
  }

  constructor(props){
    super(props)
    this.state = {
      zone: {
        username:'',
        name:'',
        zipCode:''

      }
    }
  }

  updateZone(event){
    let updated = Object.assign({}, this.state.zone)
    updated[event.target.id] = event.target.value

    this.setState({
      zone: updated
    })
    // console.log('Update zone: '+ event.target.id + "- " + event.target.value)
  }

  submitZone(event){

    let updated = Object.assign({}, this.state.zone)
    updated['zipCodes'] = updated.zipCode.split(',')
    this.setState({
      updated:updated
    })
    this.props.onCreate(updated)

    //make Api call
console.log('SubmitZone')
  }

  render(){

        return (

          <div style={styles.zone.zonedetails}>
            <h1>Update Your Zone</h1>
          <div style={styles.zone.container}>

          <h2>Current Zone:</h2>
          <h3>Zip Code: <span style={styles.profile.entry}>{this.props.list[this.props.selected].zipCodes}</span></h3>
          <h3>Zone Name: <span style={styles.profile.entry}> {this.props.list[this.props.selected].name}</span></h3>
          <Link to ="/"><button style={{marginRight:10}} type="" className="btn btn-info">Home</button></Link>

          </div>
          <div style={styles.zone.container}>
            <br /><br />
            <h4>Update Zone:</h4>
            <label>Name:</label>
            <input id="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" defaultValue={this.props.list[this.props.selected].name} /><br />
            <label>Zip Code:</label>
            <input id="zipCode" onChange={this.updateZone.bind(this)} className="form-control" type="text" defaultValue={this.props.list[this.props.selected].zipCodes} /><br />
            <button onClick={this.submitZone.bind(this)} className="btn btn-info">Update Zone</button>
          </div>
          </div>
        )
    }

}

const stateToProps = (state) => {
  return{
    list: state.zone.list,
		selected: state.zone.selectedZone,
		appStatus: state.zone.appStatus,
  }
}

const dispatchToProps = (dispatch) => {
  return{
    fetchZone: (params) => dispatch(actions.fetchZone(params))
  }
}

export default connect(stateToProps,dispatchToProps)(UpdateZone)
