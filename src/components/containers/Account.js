import React, { Component, PropTypes } from 'react'
import { APIManager, ImageHelper }     from '../../utils'
import { connect }                     from 'react-redux'
import styles                          from './styles'
import actions                         from '../../actions/actions'
import store                           from '../../stores/store'
import { Link }                        from 'react-router'
import DropZone                        from 'react-dropzone'
import sha1                            from 'sha1'
// import { Zones, Comments } from '../containers'
import Zones                           from '../containers/Zones'
import Comments                        from '../containers/Comments'
import { Header, Footer, BackToTop }   from '../presentation'

class Account extends Component{
  constructor(props){
    super(props)
    this.clearValues=this.clearValues.bind(this)
    this.state={
			user:null,
      username:'',
      password:'',
			flag:true
    }
  }
	componentDidMount(){

	}
	componentDidUpdate(){
		// console.log('componentDidUpdate' +JSON.stringify(this.state.flag) +'ugh  '+ JSON.stringify(this.props.user))
		if(this.state.flag==false&&this.props.user!=null){
			this.props.fetchZone(null)
			this.context.router.push('/')
			this.setState({
				user:this.props.user,
				flag:true
			})
		}
	}

  updateProfile(event){
    event.preventDefault()
    // console.log('updateProfile: ' + event.target.id + event.target.value)
    let updatedProfile = Object.assign({}, this.state.profile)
    updatedProfile[event.target.id] = event.target.value
    this.setState({
      profile: updatedProfile
    })
  }

  login(event){
    event.preventDefault()
    // console.log("Sign in:" + JSON.stringify(this.state.profile))

    if(this.state.profile.username.length==0){
			swal({
					title:"Error!",
					text:"You must enter a Username",
					type: "error"
				})
      return
    }
    if(this.state.profile.password.length==0){
			swal({
					title:"Error!",
					text:"You must enter a password",
					type: "error"
				})
			this.clearValues()
      return
    }

    // console.log("user from Account.js: " + JSON.stringify(this.state.profile))

		// console.log("LOGIN PROFILE: " +JSON.stringify(this.state.profile))
    this.props.createLogin(this.state.profile)

		this.setState({
			flag: true
		})
		this.context.router.push('/')
		// console.log('LOGIN: ' + JSON.stringify(this.state.user))

  }

  signUp(event){
    event.preventDefault()
    // console.log("Sign Up:" + JSON.stringify(this.state.profile))
    if(this.state.profile.username.length==0){
			swal({
					title:"Error!",
					text:"You must enter a Username",
					type: "error"
				})
      return
    }
    if(this.state.profile.password.length==0){
			swal({
 				 title:"Error!",
 				 text:"You must enter a password",
 				 type: "error"
 			 })
      return
    }
    this.props.createSignUp(this.state.profile)
  }

logout(event){
  APIManager.get('/account/logout', null, (err, response)=>{
    if(err){
      alert(err.message)
      return
    }
    // this.props.fetchCurrentUser(response.result)
    this.props.currentUserReceived(null)
    this.clearValues()
		this.setState({
			flag: false
		})
		// console.log("HERE YOU GO: " + JSON.stringify(this.state.flag))
  })
    // this.props.fetchZone(null)

}

uploadImage(files){
	const image = files[0]
	console.log("COMMENT Container Image file: "+JSON.stringify(image))
	let timestamp = Date.now()/1000
	const cloudName= 'jdrichardstech'
	const uploadPreset='qfk6kfpf'
	const apiSecret = 'e8LAFbk1H23PLU02S5Og2DzsMYQ'
	const paramStr='timestamp='+timestamp+'&upload_preset='+uploadPreset+'e8LAFbk1H23PLU02S5Og2DzsMYQ'
	const signature=sha1(paramStr)
	const apiKey = '854536555581142'
	const params = {
		'api_key': apiKey,
		'timestamp':timestamp,
		'upload_preset':uploadPreset,
		'signature': signature
	}
    const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'
    APIManager.upload(url, image,params,(err, response)=>{
      if(err){
        console.log('Upload err: ' + err.message)
        return
      }
      console.log('Uploaded image: ' + JSON.stringify(response.body))
      const imageUrl = response.body['secure_url']

      let updatedProfile = Object.assign({}, this.state.profile)
      updatedProfile['image'] = response.body['secure_url']
      this.setState({
        profile: updatedProfile
      })
			swal({
					title:"Success!",
					text:"Your image has been uploaded",
					type: "suceess"
				})
  })
}


clearValues(){
    this.refs.use.value=''
    this.refs.pass.value=''
    this.refs.username.value=''
    this.refs.password.value=''
    this.refs.gender.value=''
    this.refs.city.value=''
    this.refs.bio.value=''
		this.refs.firstName.value=''
		this.refs.lastName.value=''
}

render(){

    let content = null
    if(this.props.user==null){
      content = (
			<div>

				<div className="sb-site-container" style={{background:'#F8FAE3'}}>
					<Header />
					<div className="ms-hero-page-override" style={{background: '#FC2452'}}>
						<div className="container">
							<div className="text-center">
								

								<p  className="lead lead-lg text-center center-block mt-2 mw-800 text-uppercase fw-300 animated fadeInUp animation-delay-7" style={{background:'#FC2452', padding: '10px', color: '#F8FAE3'}}>Share and discover events in your neighborhood.<br />
								 </p>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="card card-hero animated fadeInUp animation-delay-7" style={{background:'#F8FAE3', border: '1px solid #FC2452', boxShadow: '0 2px 2px transparent'}}>
									<div className="card-block">
										<h3 className="text-center text-uppercase" style={{color:'#FC2452', fontWeight: '400'}}>Login</h3>
										<center><span className="text-uppercase" style={{fontSize:'.9em',textAlign:'center', color:'#FC2452'}}> Don't wanna register? Just login with<br />username: <em style={{color:'#FC2452'}}><strong>wendu</strong></em>&nbsp;&nbsp;&nbsp;password: <em style={{color:'#FC2452'}}><strong>1234567</strong></em></span></center>
										<form className="form-horizontal">
											<fieldset>
												<div className="form-group" style={{borderColor:'#FC2452'}}>
													<label  className="col-md-2 control-label text-uppercase" style={{color: '#FC2452'}}>Username</label>
													<div className="col-md-10">
														<input onChange={this.updateProfile.bind(this)} type="text" className="form-control text-uppercase" id="username" placeholder="your username" ref="use" style={{color:'#FC2452', fontWeight: '700', maxWidth: '720px'}} /> </div>
												</div>
												<div className="form-group">
													<label  className="col-md-2 control-label" style={{color: '#FC2452'}}>Password</label>
													<div className="col-md-10">
														<input onChange={this.updateProfile.bind(this)} type="password" className="form-control text-uppercase" id="password" placeholder="your password" ref="pass" style={{color:'#FC2452', fontWeight: '700', maxWidth: '720px'}} /> </div>
												</div>
											</fieldset>
											<button onClick={this.login.bind(this)} className="btn btn-raised btn-block text-uppercase" type="submit" style={{color:'#F8FAE3', fontWeight: '300', background: '#FC2452', maxWidth: '400px', margin: '0 auto'}}>Login
												<i className="zmdi zmdi-long-arrow-right no-mr ml-1"></i>
											</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div style={{marginTop:130}} className="row">
						<div className="col-md-12">
							<div className="card card-hero animated fadeInUp animation-delay-9" style={{background:'#F8FAE3', border: '1px solid #FC2452', boxShadow: '0 2px 2px transparent'}}>
								<div className="card-block">
											<h3 className="text-center text-uppercase" style={{color:'#FC2452', fontWeight: '400'}}>Register</h3>
											<form className="form-horizontal" style={{padding:'10px'}}>
												<fieldset>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-account"></i>
															</span>
															<label className="control-label text-uppercase" style={{color: '#FC2452'}}>First Name</label>

															<input onChange={this.updateProfile.bind(this)} type="text" id="firstName" className="form-control text-uppercase" ref="firstName" style={{color:'#FC2452', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-account"></i>
															</span>
															<label className="control-label text-uppercase" style={{color: '#FC2452'}}>Last Name</label>

															<input onChange={this.updateProfile.bind(this)} type="text" id="lastName" className="form-control text-uppercase" ref="lastName" style={{color:'#FC2452', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-account"></i>
															</span>
															<label className="control-label text-uppercase" style={{color: '#FC2452'}}>Username</label>

															<input onChange={this.updateProfile.bind(this)} type="text" id="username" className="form-control text-uppercase" ref="username" style={{color:'#FC2452', fontWeight: '700'}} /> </div>
													</div>

													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-lock"></i>
															</span>
															<label className="control-label" style={{color: '#FC2452'}}>Password</label>
															<input onChange={this.updateProfile.bind(this)} type="password" id="password" className="form-control" ref="password" style={{color:'#FC2452', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-male-female"></i>
															</span>
															<label className="control-label text-uppercase" style={{color: '#FC2452'}}>Gender</label>
															<input onChange={this.updateProfile.bind(this)} type="text" id="gender" className="form-control text-uppercase" ref="gender" style={{color:'#FC2452', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-city"></i>
															</span>
															<label className="control-label text-uppercase" style={{color: '#FC2452'}}>City</label>
															<input onChange={this.updateProfile.bind(this)} type="text" id="city" className="form-control text-uppercase" ref="city" style={{color:'#FC2452', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-puzzle-piece"></i>
															</span>
															<label className="control-label text-uppercase" style={{color: '#FC2452'}}>Short Bio</label>
															<input onChange={this.updateProfile.bind(this)} type="text" id="bio" className="form-control text-uppercase" ref="bio" style={{color:'#FC2452', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-camera"></i>
															</span>
														 <DropZone id="dropzoneLocation" style={{color:'#FC2452'}} onDrop={this.uploadImage.bind(this)}>
															 <a href="#dropzoneLocation" style={{color:'#FC2452'}} className= "text-uppercase">
																 Add Profile Image
															 </a>
														 </DropZone>
													 </div> 
													</div>
													<button onClick={this.signUp.bind(this)} className="btn btn-raised btn-block text-uppercase" type="submit" style={{color:'#F8FAE3', fontWeight: '300', background: '#FC2452', maxWidth: '400px', margin: '0 auto'}}>Register</button>
												</fieldset>
											 </form>
										 </div>
									 </div>
								 </div>
							 </div>
							</div>
					<Footer />
					<BackToTop />
			</div>
		</div>
      )
    }else{

      content = (
        <div>
					<div className="sb-site-container" style={{background:'#F8FAE3'}}>
					<Header />
					<div className="container">

				          <div className="col-md-8">
							<Comments />
						</div>

					 <div className="row">
						 <div className="col-md-4">

							 <div className="card animated fadeInUp animation-delay-7" style={{background:'#F8FAE3', border: '1px solid #FC2452', boxShadow: '0 2px 2px transparent'}}>
								 <div style={{backgroundColor:'#FC2452'}}>
									 <h4 className="index-1 text-center no-m pt-4" style={{fontWeight:400,fontSize:'2.0em'}}><Link style={{color:'#F8FAE3'}} to={'/profile/'+ this.props.user.username}>{this.props.user.username.toUpperCase()}</Link></h4>
									 <Link to={'/profile/'+ this.props.user.username}><img src={this.props.user.image} alt="..." className="img-avatar-circle" /></Link> </div>
								 <div className="card-block pt-4 text-center">
									 <h3 style={{color:'#FC2452', fontWeight: '500'}}>"About Me"</h3>
									 <p><span className="text-uppercase" style={{color:'#FC2452', fontWeight: '300'}}>{this.props.user.gender}</span></p>
									 <p><span className="text-uppercase" style={{color:'#FC2452', fontWeight: '300'}}>{this.props.user.city}</span></p>
									 <p><span className="text-uppercase" style={{color:'#FC2452', fontWeight: '300'}}>{this.props.user.bio}</span></p>

									 &nbsp;
								 	<Link className="btn btn-raised" to={'/updateprofile/'+this.props.user.username} style={{backgroundColor:'#FC2452', color: '#F8FAE3'}}>
										<i className="zmdi zmdi-account-box-o text-uppercase" style={{fontWeight: '400'}}></i>Update Profile
								 	</Link><br />
								<a style={{fontSize:'.3em'}} className="pull-right text-uppercase" href="#" onClick={this.logout.bind(this)} style={{color:'#FC2452', fontWeight: '400'}}>LOGOUT</a><br />
								 </div>
							 </div>
								<Zones />
						 </div>
					 </div>
					</div>
					<Footer />
					<BackToTop />
        </div>
			</div>
      )
    }

  {/*  let content = (this.props.appStatus=='loading') ? 'Loading...' : contentFiller*/}
    return(

        <div>
          {content}
        </div>

    )
  }
}

const stateToProps = (state) =>{
  return{
    user: state.account.user
  }


}

const dispatchToProps = (dispatch) => {
  return{
      currentUserReceived: (user) => dispatch(actions.currentUserReceived(user)),
      fetchCurrentUser: (params) => dispatch(actions.fetchCurrentUser(params)),
      fetchZone: (params) => dispatch(actions.fetchZone(params)),
      createLogin: (params) => dispatch(actions.createLogin(params)),
      createSignUp: (params) => dispatch(actions.createSignUp(params))

  }

}

Account.contextTypes={
	router:PropTypes.object
}

export default connect(stateToProps, dispatchToProps)(Account)
