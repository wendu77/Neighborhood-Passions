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
				<div style={{backgroundColor: '#FC2452'}}>
					<div className="ms-hero-page-override ms-bg-fixed" style={{backgroundColor: '#F8FAE3', color:'FC2452'}}>
						<div className="container" >
							<div className="text-center mt-2" style={{paddingTop:75}}>
								<h2 className="mt-4 animated fadeInUp animation-delay-10 text-uppercase" style={{fontWeight:'400', color: '#FC2452'}}>Profile Page</h2>
								<img src={profile.image} className="ms-avatar-hero animated zoomIn animation-delay-7" />
								<h2 className="mt-4 animated fadeInUp animation-delay-10 text-uppercase" style={{color: '#FC2452'}}><strong>{profile.firstName} {profile.lastName}</strong></h2>
								<h3 className="no-mb animated fadeInUp animation-delay-10 text-uppercase" style={{color:'#FC2452'}}>{profile.bio}</h3>
							</div>
						</div>
					</div>
					<div  className="container" style={{backgroundColor: '#FC2452'}}>
						<div className="row">
							<div className="col-md-6 col-md-offset-3">
								<div className="card-block">
									<h3  className="no-mb text-uppercase" style={{textAlign:'center',padding:'20px 0 20px 0', color: '#F8FAE3', fontWeight: '400'}}>Personal Information</h3>
								</div>
								<div>
								<table className="table table-striped table-striped-warning">
									<tbody>
										<tr style={{backgroundColor: '#FC2452', color:'#F8FAE3', border: '2px solid #F8FAE3'}}>
											<th>
												<i className="zmdi zmdi-face mr-1"></i> Full Name</th>
											<td className="text-uppercase">{profile.firstName} {profile.lastName}</td>
										</tr>
										<tr  style={{backgroundColor: '#FC2452', color:'#F8FAE3', border: '2px solid #F8FAE3'}}>
											<th>
												<i className="zmdi zmdi-account mr-1"></i> User Name</th>
											<td className="text-uppercase">{profile.username}</td>
										</tr>
										<tr style={{backgroundColor: '#FC2452', color:'#F8FAE3', border: '2px solid #F8FAE3'}}>
											<th>
												<i className="zmdi zmdi-male-female mr-1"></i> Gender</th>
											<td className="text-uppercase">{profile.gender}</td>
										</tr>
										<tr style={{backgroundColor: '#FC2452', color:'#F8FAE3', border: '2px solid #F8FAE3'}}>
											<th>
												<i className="zmdi zmdi-email mr-1"></i> Email</th>
											<td className="text-uppercase">
												<a href="#" style={{color: '#F8FAE3'}}>{profile.username}@me.com</a>
											</td>
										</tr>
										<tr style={{backgroundColor: '#FC2452', color:'#F8FAE3', border: '2px solid #F8FAE3'}}>
											<th>
												<i className="zmdi zmdi-link mr-1"></i> Website</th>
											<td className="text-uppercase">
												<a href="#" style={{color: '#F8FAE3'}}>www.{profile.username}.com</a>
											</td>
										</tr>
									</tbody>
								</table>
								</div>
								<Link to ="/"><button style={{margin:'0 auto 100px auto', width:'50%', backgroundColor: '#F8FAE3', color: '#FC2452', textAlign: 'center'}} type="" className="btn btn-raised btn-block"><i className="ml-1 no-mr zmdi zmdi-home"></i>&nbsp;&nbsp;Home</button></Link>

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
