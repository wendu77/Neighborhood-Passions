import React, { Component } from 'react'
import { Profile }          from '../containers/'


class ProfileInfo extends Component{

  componentDidMount(){
    console.log('Profile componentDidMount: ' + JSON.stringify(this.props.params))
  }

  render(){
    return(
      <div>
        <div>
          <Profile username={this.props.params.username} />
        </div>
      </div>
    )
  }
}


export default ProfileInfo
