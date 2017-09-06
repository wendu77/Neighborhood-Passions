import React    from 'react'
import { Link } from 'react-router'
import styles   from './styles'


const ProfileDetails = (props) => {
  return(
    <div style={styles.profile.profiledetails}>
      <h1>User Profile:</h1>
      <h3>Username:  <span style={styles.profile.entry}>{props.username}</span></h3>
      <h3>Image: <img src={props.image} /></h3>
      <h4>Gender: <span style={styles.profile.entry}> {props.gender}</span> </h4>
      <h4>City: <span style={styles.profile.entry}> {props.city}</span></h4>
			<h4>Bio: {props.bio}</h4>
      <Link to = "/"><button type="" className="btn btn-info">Back</button></Link>
    </div>
  )
}

export default ProfileDetails
