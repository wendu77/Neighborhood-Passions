import React, { Component }        from 'react'
import { APIManager}               from '../../utils'
import styles                      from './styles'
import { connect }                 from 'react-redux'
import actions                     from '../../actions/actions'
import { Link }                    from 'react-router'
import {Header, BackToTop, Footer} from '../presentation'

class Profile extends Component{
  constructor(props){
    super(props)
    this.state={

    }
  }

  componentDidMount(){
    console.log(JSON.stringify(this.props.username))
  		const profile = this.props.profiles[this.props.username]
  		if (profile != null)
  			return

  		this.props.fetchProfile({username: this.props.username})
}

  render(){

    let profile = this.props.profiles[this.props.username]

    var header = null
    if (profile != null){
      header = (
				<div style={{backgroundColor: '#000'}}>
					<div className="ms-hero-page-override ms-bg-fixed" style={{backgroundColor: '#ff0088', color:'#fff'}}>
						<div className="container" >
							<div  className="text-center mt-2" style={{paddingTop:75}}>
								<h1 className="color-white mt-4 animated fadeInUp animation-delay-10" style={{fontWeight:'700'}}>Profile Page</h1>
								<img src={profile.image} className="ms-avatar-hero animated zoomIn animation-delay-7" />
								<h1 className="color-white mt-4 animated fadeInUp animation-delay-10">{profile.firstName} {profile.lastName}</h1>
								<h3 className="no-mb animated fadeInUp animation-delay-10" style={{color:'#fff'}}>{profile.bio}</h3>
							</div>
						</div>
					</div>
					<div  className="container">
						<div className="row">
							<div className="col-md-6 col-md-offset-3">
								<div className="card-block">
									<h2  className="no-mb" style={{textAlign:'center',padding:'20px 0 20px 0', color: '#ff0088', fontWeight: '400'}}>Personal Information</h2>
								</div>
								<div>
								<table className="table table-striped table-striped-warning">
									<tbody>
										<tr style={{backgroundColor: '#000', color:'#fff', border: '2px solid #fff'}}>
											<th>
												<i className="zmdi zmdi-face mr-1 color-warning"></i> Full Name</th>
											<td>{profile.firstName} {profile.lastName}</td>
										</tr>
										<tr  style={{backgroundColor: '#000', color:'#fff', border: '2px solid #ff0088'}}>
											<th>
												<i className="zmdi zmdi-account mr-1 color-royal"></i> User Name</th>
											<td>{profile.username}</td>
										</tr>
										<tr style={{backgroundColor: '#000', color:'#fff', border: '2px solid #fff'}}>
											<th>
												<i className="zmdi zmdi-male-female mr-1 color-success"></i> Gender</th>
											<td>{profile.gender}</td>
										</tr>
										<tr style={{backgroundColor: '#000', color:'#fff', border: '2px solid #ff0088'}}>
											<th>
												<i className="zmdi zmdi-email mr-1 color-primary"></i> Email</th>
											<td>
												<a href="#">{profile.username}@me.com</a>
											</td>
										</tr>
										<tr style={{backgroundColor: '#000', color:'#fff', border: '2px solid #fff'}}>
											<th>
												<i className="zmdi zmdi-link mr-1 color-danger"></i> Website</th>
											<td>
												<a href="#">www.{profile.username}.com</a>
											</td>
										</tr>
									</tbody>
								</table>
								</div>
								<Link to ="/"><button style={{margin:'0 auto 100px auto', width:'50%', backgroundColor: '#ff0088', color: '#fff', textAlign: 'center'}} type="" className="btn btn-success  btn-raised btn-block"><i className="ml-1 no-mr zmdi zmdi-home"></i>&nbsp;&nbsp;Home</button></Link>

							</div>
						</div>
					</div>
				</div>
      )
    }

    const content = (this.props.appStatus == 'loading') ? 'Loading...' : header

    return (
			<div>
				<div className="sb-site-container" style={{background:'#fff'}}>
					<Header />
	        {content}
				</div>
				<BackToTop />
				<Footer />
			</div>
    )
  }
}

const stateToProps = (state) => {
  return{

    profiles: state.profile.map,
    appStatus: state.profile.appStatus
  }
}

const dispatchToProps = (dispatch) => {
  return{
    fetchProfile: (params) => dispatch(actions.fetchProfile(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile)
