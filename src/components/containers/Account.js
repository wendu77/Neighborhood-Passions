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

				<div className="sb-site-container" style={{background:'#ff0088'}}>
					<Header />
					<div className="ms-hero-page-override ms-hero-img-city ms-hero-bg-dark-light">
						<div className="container">
							<div className="text-center">
								<span className="ms-logo ms-logo-lg ms-logo-black center-block mb-2 mt-2 animated zoomInDown animation-delay-5" style={{background:'#ff0088'}}>CO</span>
								<h1 className="no-m ms-site-title color-white center-block ms-site-title-lg mt-2 animated zoomInDown animation-delay-5">Neighborhood
									<span>Doings</span>
								</h1>
								<p  className="lead lead-lg color-white text-center center-block mt-2 mw-800 text-uppercase fw-500 animated fadeInUp animation-delay-7" style={{background:'#ff0088', padding: '10px'}}>Share and discover events in your neighborhood! <br />
								 </p>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="card card-hero animated fadeInUp animation-delay-7" style={{background:'#000119'}}>
									<div className="card-block">
										<h1 className="text-center" style={{color:'#ff0088', fontWeight: '700'}}>Login</h1>
										<center><span style={{fontSize:'.9em',textAlign:'center',color:'#fff'}}> Don't wanna register? Just login with<br />username: <em style={{color:'#ff0088'}}>wendu</em>&nbsp;&nbsp;&nbsp;password: <em style={{color:'#ff0088'}}>1234567</em></span></center>
										<form className="form-horizontal">
											<fieldset>
												<div className="form-group" style={{borderColor:'#ff0088'}}>
													<label  className="col-md-2 control-label">Username</label>
													<div className="col-md-10">
														<input onChange={this.updateProfile.bind(this)} type="text" className="form-control" id="username" placeholder="your username" ref="use" style={{color:'#ff0088', fontWeight: '700', maxWidth: '720px'}} /> </div>
												</div>
												<div className="form-group">
													<label  className="col-md-2 control-label">Password</label>
													<div className="col-md-10">
														<input onChange={this.updateProfile.bind(this)} type="password" className="form-control" id="password" placeholder="your password" ref="pass" style={{color:'#ff0088', fontWeight: '700', maxWidth: '720px'}} /> </div>
												</div>
											</fieldset>
											<button onClick={this.login.bind(this)} className="btn btn-raised btn-block" type="submit" style={{color:'#fff', fontWeight: '300', background: '#ff0088', maxWidth: '400px', margin: '0 auto'}}>Login
												<i className="zmdi zmdi-long-arrow-right no-mr ml-1"></i>
											</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div style={{marginTop:130}} className="row">
						<div className="col-md-12">
							<div className="card card-hero animated fadeInUp animation-delay-9" style={{background:'#000119'}}>
								<div className="card-block">
											<h1 className="text-center" style={{color:'#ff0088', fontWeight: '700'}}>Register</h1>
											<form className="form-horizontal" style={{padding:'10px'}}>
												<fieldset>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-account"></i>
															</span>
															<label className="control-label" >First Name</label>

															<input onChange={this.updateProfile.bind(this)} type="text" id="firstName" className="form-control" ref="firstName" style={{color:'#ff0088', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-account"></i>
															</span>
															<label className="control-label" >Last Name</label>

															<input onChange={this.updateProfile.bind(this)} type="text" id="lastName" className="form-control" ref="lastName" style={{color:'#ff0088', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-account"></i>
															</span>
															<label className="control-label" >Username</label>

															<input onChange={this.updateProfile.bind(this)} type="text" id="username" className="form-control" ref="username" style={{color:'#ff0088', fontWeight: '700'}} /> </div>
													</div>

													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-lock"></i>
															</span>
															<label className="control-label" >Password</label>
															<input onChange={this.updateProfile.bind(this)} type="password" id="password" className="form-control" ref="password" style={{color:'#ff0088', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-male-female"></i>
															</span>
															<label className="control-label" >Gender</label>
															<input onChange={this.updateProfile.bind(this)} type="text" id="gender" className="form-control" ref="gender" style={{color:'#ff0088', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-city"></i>
															</span>
															<label className="control-label" >City</label>
															<input onChange={this.updateProfile.bind(this)} type="text" id="city" className="form-control" ref="city" style={{color:'#ff0088', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-puzzle-piece"></i>
															</span>
															<label className="control-label" >Short Bio</label>
															<input onChange={this.updateProfile.bind(this)} type="text" id="bio" className="form-control" ref="bio" style={{color:'#ff0088', fontWeight: '700'}} /> </div>
													</div>
													<div className="form-group label-floating">
														<div className="input-group">
															<span className="input-group-addon">
																<i className="zmdi zmdi-camera"></i>
															</span>
														 <DropZone id="dropzoneLocation" style={{color:'#ff0088'}} onDrop={this.uploadImage.bind(this)}>
															 <a href="#dropzoneLocation" style={{color:'#ff0088'}} >
																 Add Profile Image
															 </a>
														 </DropZone>
													 </div> 
													</div>
													<button onClick={this.signUp.bind(this)} className="btn btn-raised btn-block btn-primary" type="submit" style={{color:'#fff', fontWeight: '300', background: '#ff0088', maxWidth: '400px', margin: '0 auto'}}>Register</button>
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
					<div className="sb-site-container" style={{background:'#fff'}}>
					<Header />
					<div className="container">

				          <div className="col-md-8">
							<Comments />
						</div>

					 <div className="row">
						 <div className="col-md-4">

							 <div className="card animated fadeInUp animation-delay-7">
								 <div style={{backgroundColor:'#ff0088'}}>
									 <h3 className="color-white index-1 text-center no-m pt-4" style={{fontWeight:700,fontSize:'2.3em'}}><Link style={{color:'white'}} to={'/profile/'+ this.props.user.username}>{this.props.user.username.toUpperCase()}</Link></h3>
									 <Link to={'/profile/'+ this.props.user.username}><img src={this.props.user.image} alt="..." className="img-avatar-circle" /></Link> </div>
								 <div className="card-block pt-4 text-center">
									 <h3 style={{color:'#000', fontWeight: '500'}}>"About Me"</h3>
									 <p><span style={{color:'#ff0088', fontWeight: '400'}}>GENDER: </span><span style={{color:'#000', fontWeight: '400'}}>{this.props.user.gender}</span></p>
									 <p><span style={{color:'#ff0088', fontWeight: '400'}}>CITY: </span><span style={{color:'#000', fontWeight: '400'}}>{this.props.user.city}</span></p>
									 <p><span style={{color:'#ff0088', fontWeight: '400'}}>BIO: </span><span style={{color:'#000', fontWeight: '400'}}>{this.props.user.bio}</span></p>

									 &nbsp;
								 	<Link className="btn btn-raised" to={'/updateprofile/'+this.props.user.username} style={{backgroundColor:'#ff0088', color: '#fff'}}>
										<i className="zmdi zmdi-account-box-o" style={{fontWeight: '400'}}></i>Update Profile
								 	</Link><br />
								<a style={{fontSize:'1em'}} className="pull-right" href="#" onClick={this.logout.bind(this)} style={{color:'#000', fontWeight: '400'}}>LOGOUT</a><br />
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
