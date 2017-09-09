import React from 'react'

const BackToTop = (props) => {
  return(
    <div>
			<div className="btn-back-top">
				<a href="#" data-scroll id="back-top" className="btn-circle btn-circle-sm btn-circle-raised" style={{backgroundColor:'#FC2452', color: '#F8FAE3'}}>
					<i className="zmdi zmdi-long-arrow-up" style={{fontWeight: '700'}}></i>
				</a>
			</div>
    </div>
  )
}

export default BackToTop
