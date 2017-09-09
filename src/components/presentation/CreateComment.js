import React, { Component } from 'react'
import DropZone             from 'react-dropzone'



class CreateComment extends Component {
	constructor(){
		super()
		this.state = {
			key:1,
			picDropped:false,
			comment: {
				commentImage:null,
				body:'',
				title:''

			}
		}
	}


	grabImage(files){
		console.log('Grab image: '+ JSON.stringify(files))
		let newImage = Object.assign({},this.state.comment)
		newImage['commentImage']=files

		console.log("GRABBED: " + JSON.stringify(this.state.commentImage))
		this.props.handleImage(files)
		this.setState({
			commentImage: newImage,
			picDropped:true
		})
	}

	updateComment(event){
//		console.log('updateComment: ' + event.target.id + ' == ' + event.target.value)
		let updatedComment = Object.assign({}, this.state.comment)
		updatedComment[event.target.id] = event.target.value
		this.setState({
			comment: updatedComment
		})
	}

	submitComment(event){
		console.log('submitComment: '+JSON.stringify(this.state.comment))
		this.props.onCreate(this.state.comment)
		this.setState({
			commentImage:null,
			picDropped:false
		})
		this.refs.title.value=" "
		this.refs.body.value=" "
		this.refs.imageUrl.value=" "

	}

	handleSelect(key) {
	//  alert('selected ' + key);
	 this.setState({key});
 }

	render(){
		let newImage =	(this.state.comment.commentImage == null && this.state.picDropped ==false) ? null : this.props.commentImage


		return (
			<div>
				<div className="row">
					<div className="col-md-12">

						<h2 className="text-uppercase" style={{fontWeight:400, color: '#FC2452'}}><i className="zmdi zmdi-comment-text" style={{color:'#FC2452'}}></i>&nbsp;&nbsp;Create New Post</h2>
						<hr style={{border:'1px solid #FC2452', background:'#FC2452', color:'#FC2452'}} />
						<div style={{padding:'20px 30px 20px 30px'}}>


						<h3 className="text-uppercase" style={{color: '#FC2452', fontWeight: '300'}}>Post:</h3>
							<input style={{width:'75%',padding:'0 0 20px 0', color: '#FC2452'}} onChange={this.updateComment.bind(this)} id="title" className="form-control text-uppercase" type="text" placeholder="Add Title Here"  ref="title"/>
							<input style={{width:'75%',padding:'0 0 20px 0', color: '#FC2452'}} onChange={this.updateComment.bind(this)} id="body" className="form-control text-uppercase" type="text" placeholder="Add Comment Here" ref="body" />
						</div>
					</div>
				</div>

			<div className="row" >
				<div className="col-md-6">
				<div style={{padding:'35px 0 30px 30px'}}>
					<h3 style={{color: '#FC2452', fontWeight: '300'}}>Image:</h3>
						<DropZone id="dropzoneSpot" style={{border:'1px solid #F8FAE3',fontSize:'1em'}} onDrop={this.grabImage.bind(this)}>
							<a className="text-uppercase" href="#dropzoneSpot" style={{color: '#FC2452'}}>
								Click to Upload Image&nbsp;<i className="ml-1 no-mr zmdi zmdi-long-arrow-up"></i>
							</a>
						</DropZone>
				</div>

				</div>
				 <div className="col-md-6" style={{paddingRight:30}}>
					 <div style={{marginTop:50}} ><img style={{height:100}} src={newImage} ref="imageUrl" /></div>
				 </div>
			 </div>
			 <div className="row">
				 <div className="col-md-12" style={{padding:30}}>
					 <a className="pull-right" style={{width:'30%', color:'#FC2452', margin:'0 auto'}} onClick={this.submitComment.bind(this)} href="javascript:void(0)" className="btn btn-raised btn-block animate-icon text-uppercase" data-dismiss="modal" style={{backgroundColor: '#FC2452', color: '#F8FAE3'}}>Submit Post&nbsp;&nbsp;<i className="ml-1 no-mr zmdi zmdi-long-arrow-right"></i>
					 </a>
					</div>
			 </div>

		 </div>
		)
	}
}

export default CreateComment
