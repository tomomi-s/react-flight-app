import React from 'react'
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';

function Error({error, button, href}) {
	return (
		<div id="error" className="row">
			<div className="col-12 text-center">
				<h3 className="font-white"><i className="fas fa-exclamation-circle" style={{marginRight: 5}}></i>{error}</h3>
				<Link to={href} href="#">
				    <Fab
				    	type="submit"
				    	variant="extended" 
				    	color="primary" 
				    	aria-label="add"
				    >
			          {button}
			        </Fab>
				</Link>
			</div>
		</div>
	)
}

export default Error