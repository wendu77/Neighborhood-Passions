import React, { Component }        from 'react'
import { CreateComment, Comment }  from '../presentation'
import styles                      from './styles'
import { APIManager, ImageHelper } from '../../utils'
import { connect }                 from 'react-redux'
import actions                     from '../../actions/actions'
import DropZone                    from 'react-dropzone'
import sha1                        from 'sha1'

class Comments extends Component {
	constructor(){
		super()
		this.state = {
			updated:{

			},
			commentsLoaded: false,
			index: 0
		}
	}


		componentDidUpdate(){
			let zone = this.props.zones[this.props.index]
			if (zone == null){
				console.log('NO SELECTED ZONE!!!!')
				return
			}

			let commentsArray = this.props.commentsMap[zone._id]
			if (commentsArray != null) // comments have been already loaded!
				return

			APIManager.get('/api/comment', {zone:zone._id}, (err, response) => {
				if (err){
					swal({
							title:"Error!",
							text:err.message,
							type: "error"
						})
					return
				}

				let comments = response.results
				this.props.commentsReceived(comments, zone)
			})
			// this.props.fetchComments({ zone:zone._id})
		}


	submitComment(comment){
		if(this.props.user == null){
			swal({
					title:"Error!",
					text:"Please Register or Login",
					type: "error"
				})
			return
		}

		let updatedComment = Object.assign({}, comment)
		let zone = this.props.zones[this.props.index]
		updatedComment['commentImage']=this.state.updated.commentImage
		updatedComment['zone'] = zone._id
		updatedComment['username']= this.props.user.username
		updatedComment['author'] = {
		id: this.props.user._id,
		username: this.props.user.username,
		image: this.props.user.image
		}

		this.props.createComment(updatedComment)
	}


	submitEdit(comment, updated){
		// console.log('update comment: '+ comment._id+", "+ JSON.stringify(updated))
		updated['commentImage'] = this.state.updated.commentImage
		this.setState({
			commentImage: null
		})
		console.log('Updated Image: ' + JSON.stringify(updated))
		this.props.updateComment(comment, updated)
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

			let updatedProfile = Object.assign({}, this.state.updated)
			updatedProfile['commentImage'] = response.body['secure_url']
			this.setState({
				updated: updatedProfile
			})
			// console.log("UPDATED COMMENT:" + JSON.stringify(this.state.updated))
	})
	}

	render(){
		const selectedZone = this.props.zones[this.props.index]
		const image = (this.state.updated.commentImage==null) ? '' : ImageHelper.thumbnail(this.state.updated.commentImage, 22)

		let zoneName = null
		let commentList = null
		let header = null
		if(this.props.user !=null){
			if (selectedZone != null){
				zoneName = selectedZone.name
				let zoneComments = this.props.commentsMap[selectedZone._id]
				// console.log('ZoneComment: ' + JSON.stringify(this.props.commentsMap))
				// console.log('SELECTED ZONE ID = '+selectedZone._id)
				// console.log('COMMENTS MAP = '+JSON.stringify(this.props.commentsMap))
				if (zoneComments != null){
					commentList = zoneComments.map((comment, i) => {
						return (
							<div key={i}>
								<li style={{color:'#ff0088'}}><Comment commentImage={this.state.updated.commentImage} handleImage={this.uploadImage.bind(this)} handleSubmitEdit={this.submitEdit.bind(this)}  user={this.props.user} currentComment={comment} index={i} /></li>
							</div>
						)
					})
				}
			}

			 header =
				<div>
					<article className="card wow fadeIn animation-delay-2 mb-4">
					<div className="card-block text-uppercase" style={{backgroundColor: '#FC2452', color: '#F8FAE3', fontWeight: '400', display: 'block', textAlign: 'center'}}>
						<div className="row">
							<div className="col-lg-12">
							<h2 className="text-uppercase" style={{color:'#F8FAE3'}}>Posts for <span className="text-uppercase" style={{color:'#F8FAE3', fontWeight: '500'}}>{zoneName}</span></h2>
							<center><img style={{width:'85%', maxHeight:300, border: '1px solid #FC2452'}} src="/images/neighborhood.jpg" /><br /><br />
								<button type="button" className="btn btn-raised text-uppercase" data-toggle="modal" data-target="#myModal2" style={{backgroundColor: '#F8FAE3', color:'#FC2452'}}>
									Create Post&nbsp;&nbsp;<i className="zmdi zmdi-comment-outline"></i>
								</button>
							</center>

								</div>
							</div>
						</div>
						</article>
						<div>
							<ul className="text-uppercase" style={{listStyle:'none', padding:0, color: '#000'}}>
								{ commentList }
							</ul>
						</div>

							<center>
								<button style={{marginBottom:50}} type="button" className="btn btn-raised text-uppercase" data-toggle="modal" data-target="#myModal2" style={{backgroundColor: '#FC2452', color:'#F8FAE3'}}>
									Create Comment For This Neighborhood&nbsp;&nbsp;<i className="zmdi zmdi-comment-outline"></i>
								</button>
							</center>



			 <div className="modal" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
					 <div className="modal-dialog modal-md animated zoomIn animated-3x" role="document">
							 <div className="modal-content text-uppercase" style={{backgroundColor: '#F8FAE3', color:'#FC2452'}}>
									 <div className="modal-header text-uppercase" style={{color:'#FC2452'}}>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{backgroundColor: '#FC2452', color:'#F8FAE3'}}><span aria-hidden="true"><i className="zmdi zmdi-close"></i></span></button>

									 </div>
									 <div className="modal-body text-uppercase">

									 <CreateComment commentImage={this.state.updated.commentImage} handleImage={this.uploadImage.bind(this)}  onCreate={this.submitComment.bind(this)} />

									 </div>

							 </div>
					 </div>
			 </div>
				</div>
				}

		let content = (this.props.appStatus=='loading') ? <div id="ms-preload" className="ms-preload">
			<div id="status">
				<div className="spinner">
					<div className="dot1"></div>
					<div className="dot2"></div>
				</div>
			</div>
		</div> : header

		return (
			<div>
				{header}
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		commentsMap: state.comment.map,
		// comments: state.comment.list,
		commentsLoaded: state.comment.commentsLoaded,
		appStatus: state.comment.appStatus,
		index: state.zone.selectedZone,
		zones: state.zone.list,
		user: state.account.user
	}
}

const dispatchToProps = (dispatch) => {
	return {
		commentsReceived: (comments, zone) => dispatch(actions.commentsReceived(comments, zone)),
		fetchComments: (zone) => dispatch(actions.fetchComments(zone)),
		updateComment:(comment, updated) => dispatch(actions.updateComment(comment, updated)),
		commentCreated: (comment) => dispatch(actions.commentCreated(comment)),
		createComment: (comment) => dispatch(actions.createComment(comment))
	}
}

export default connect(stateToProps, dispatchToProps)(Comments)
