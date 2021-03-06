import React from 'react'

const Header = (props) => {
  return(
    <div>
		<div className="modal" id="ms-account-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div className="modal-dialog animated zoomIn animated-3x" role="document">
				<div className="modal-content">
					<div className="modal-header shadow-2dp no-pb">
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">
								<i className="zmdi zmdi-close"></i>
							</span>
						</button>
						<div className="modal-title text-center" style={{backgroundColor:'#FC2452'}}>
							<span className="ms-logo ms-logo-sm mr-1" style={{backgroundColor:'#F8FAE3', color: '#FC2452'}}>CO</span>
							<h3 className="no-m ms-site-title" style={{color: '#F8FAE3'}}>NEIGHBORHOOD
								<span>PASSIONS</span>
							</h3>
						</div>

					</div>

				</div>
			</div>
		</div>
		<header className="ms-header" style={{backgroundColor:'#FC2452'}}>
			<div className="container container-full">
				<div className="ms-title">
					<a href="index.html">
						<span className="ms-logo animated zoomInDown animation-delay-5" style={{backgroundColor:'#F8FAE3', color: '#FC2452'}}>CO</span>
						<h1 className="animated fadeInRight animation-delay-6" style={{color:'#F8FAE3'}}>NEIGHBORHOOD
							<span>PASSIONS</span>
						</h1>
					</a>
				</div>
			</div>
		</header>
		<nav className="navbar navbar-static-top yamm ms-navbar" style={{backgroundColor:'#FC2452', boxShadow: '0 3px 3px transparent'}}>
			<div className="container container-full">
				<div className="navbar-header">
					<a className="navbar-brand" href="index.html">

						<span className="ms-logo ms-logo-sm" style={{backgroundColor:'#F8FAE3', color: '#FC2452'}}>CO</span>
						<span className="ms-title" style={{color: '#F8FAE3'}}>NEIGHBORHOOD
							<strong>PASSIONS</strong>
						</span>
					</a>
				</div>
				<div id="navbar" className="navbar-collapse collapse">
					<ul className="nav navbar-nav">
				</ul>
				</div>

			</div>
		</nav>
    </div>
  )
}

export default Header
