import React, { Component } from 'react'
import { Link }             from 'react-router'
import DateUtils            from '../../utils/DateUtils'
import DropZone             from 'react-dropzone'
import Time                 from 'react-time'

class Comment extends Component {
constructor(){
	super()
	this.state={
		updated:null,
		picDropped:false,

		isEditing:false,
		showEdit:true
	}
}

componentDidMount(){
	// console.log("Comment ID: " + this.props.currentComment._id)
}

handleEditClick(event){

	this.setState({
		isEditing:true,
		showEdit:false,


	})
}

handleEditChange(event){

let updatedComment = Object.assign({}, this.state.updated)
updatedComment[event.target.id] = event.target.value

this.setState({
	updated: updatedComment,
	picDropped: true
})
}

cancelEdit(event){
	this.setState({
		isEditing:false,
		showEdit:true
	})
}

updateComment(event){
	let updatedComment = Object.assign({}, this.state.updated)

	// console.log("Presentation comment updated: " + JSON.stringify(updatedComment))
	if(this.state.updated!=null){
		this.props.handleSubmitEdit(this.props.currentComment, updatedComment)
	}
	this.setState({
		updated:null,
		isEditing:false,
		showEdit:true,
		picDropped:false
	})
}

grabImage(files){
	console.log('Grab image: '+ JSON.stringify(files))

	let newImage = Object.assign({}, this.state.updated)
	newImage['currectImage'] = files
	this.setState({
		updated:newImage
	})

	this.props.handleImage(files)
}

	render(){
		let newImage =	(this.state.updated == null && this.state.picDropped ==false) ? null : this.props.commentImage
		const currentComment = this.props.currentComment
		const author = currentComment.author
		const radius = 16
		const showEditButton = (this.props.user.username == author.username && this.state.showEdit==true) ?

		<div className="col-lg-4 text-right">
			<a onClick={this.handleEditClick.bind(this)} href="javascript:void(0)" className="btn btn-raised btn-block text-uppercase" style={{backgroundColor: '#F8FAE3', color: '#FC2452'}}><i className="ml-1 no-mr zmdi zmdi-edit"></i>&nbsp;&nbsp;Edit
			</a>
		</div>
		: null

		const commentEditingInfo = (this.state.isEditing == true) ?
			<div style={{backgroundColor: '#FC2452'}}>
				<div className="row">
				<div className="col-md-12">
				<hr style={{border:'1px solid #F8FAE3', color:'#F8FAE3'}} />
				<div style={{padding:30}}>
				<h4 className="text-uppercase" style={{textAlign: 'center', color: "#F8FAE3"}}>Edit Your Current Comment Below:</h4>

				<input className="form-control text-uppercase" onChange={this.handleEditChange.bind(this)} type="text" placeholder="Change Title" id="title" style={{color: '#F8FAE3'}}/> <br />
				<input className="form-control text-uppercase" onChange={this.handleEditChange.bind(this)} type="text" placeholder="Change Text" id="body" style={{color: '#F8FAE3'}}/> <br />
				</div>
			</div>
		</div>
		<div className="row" >
		<div className="col-md-6" style={{padding:30}}>
			<DropZone style={{border:'1px solid transparent', fontSize:'1em'}} onDrop={this.grabImage.bind(this)}><a onClick={this.handleEditClick.bind(this)} href="javascript:void(0)" style={{color: '#F8FAE3'}} className="text-uppercase text-center">
				<i className="ml-1 no-mr zmdi zmdi-camera" style={{color: '#F8FAE3'}}></i>&nbsp;Change Post Image
			</a></DropZone>
		</div>
			 <div className="col-md-6" style={{padding:30}}>
				 <div style={{marginTop:50}} ><img style={{height:100}} src={newImage} ref="image" /></div>
			 </div>
			 </div>
			 <div className="row">
				 <div className="col-md-12" style={{padding:30}}>
				<div className="row">
					<div className="col-md-6" style={{padding:10}}>
						<a style={{width:'50%', color:'#FC2452'}} onClick={this.updateComment.bind(this)} href="javascript:void(0)" className="pull-right btn btn-raised btn-block animate-icon text-uppercase" style={{backgroundColor: '#F8FAE3', color: '#FC2452'}}>Submit&nbsp;&nbsp;<i className="ml-1 no-mr zmdi zmdi-long-arrow-right"></i>
					 </a>
					</div>
					<div className="col-md-6" style={{padding:10}}>
						<a style={{width:'50%', color:'#FC2452'}} onClick={this.cancelEdit.bind(this)} href="javascript:void(0)" className="pull-left btn btn-raised btn-block text-uppercase" style={{backgroundColor: '#F8FAE3', color: '#FC2452'}}><i className="ml-1 no-mr zmdi zmdi-close"></i>&nbsp;&nbsp;Cancel
					 </a>
					</div>
					<div className="col-md-6">

					</div>
				</div>



	 				</div>
			 </div>
		 </div>
		:
		<div></div>


		return (

			<div>
				<article className="card wow fadeInLeft animation-delay-5 mb-4" style={{backgroundColor: '#FC2452'}}>
					<div className="card-block">
						<div className="row">
							<div className="col-lg-6">
								<img src={currentComment.commentImage} alt="" className="img-responsive mb-4" />
							</div>
							<div className="col-lg-6">
								<h3 className="no-mt text-uppercase" style={{color:'#F8FAE3', fontWeight: '400'}}>
									{currentComment.title}
								</h3>
								<p className="mb-4 text-uppercase" style={{color: '#F8FAE3', fontWeight: '300'}}>{currentComment.body}</p>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-8" style={{color: '#F8FAE3'}}>
								<Link  to = {'/profile/'+ currentComment.username}>
									<img style={{height:50, width:50, borderRadius:25}} src={author.image} alt="..." className="img-circle mr-1 text-uppercase" />
								</Link>
								BY&nbsp;
								<a  className="ms-tag" href="javascript:void(0)" style={{backgroundColor: '#F8FAE3'}}><Link style={{color:'#FC2452'}}  to = {'/profile/'+ currentComment.username}>{currentComment.username}</Link></a>

								<span className="ml-1 hidden-xs">
									<i className="zmdi zmdi-time mr-05"  style={{color: '#F8FAE3'}}></i>
									<span style={{color: '#F8FAE3'}}>{DateUtils.formattedDate(currentComment.timestamp)}</span>
								</span>

							</div>
							<div>
								{showEditButton}
							</div>

							<br />

							<div>
								<br /><br />
								{commentEditingInfo}
							</div>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default Comment
