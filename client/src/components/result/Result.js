import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Flight from '../search/Flight';
import Fab from '@material-ui/core/Fab';

const Result = ({search_query, quote: {
	MinPrice,
	OutboundLeg,
	InboundLeg,
	outbound_place_origin,
	outbound_place_destination,
	outbound_carrier,
	inbound_place_origin,
	inbound_place_destination,
	inbound_carrier}}) => {
	return (
		<div className="card margin-bottom-20">
			<div className="row">
				<div className="col-md-8 padding-top-10 padding-bottom-10 d-flex flex-column justify-content-center">
					<Flight 
						leg={OutboundLeg}
						origin={outbound_place_origin}
						destination={outbound_place_destination}
						carrier={outbound_carrier}/>
					<Flight 
						leg={InboundLeg}
						origin={inbound_place_origin}
						destination={inbound_place_destination}
						carrier={inbound_carrier}/>
				</div>
				<div className="d-none d-md-block col-md-1 ticket">
					<div className="ticket-edge ticket-top"></div>
					<div className="ticket-edge ticket-bottom"></div>
				</div>
				<div className="col-md-3 text-center padding-top-10 padding-bottom-10 d-flex flex-column justify-content-center">
					<div className="margin-bottom-10">
						<h4 style={{marginBottom:0}}>€{MinPrice * search_query.Passenger}</h4>
						{
							search_query.Passenger > 1 && <div>(€{MinPrice} per passenger)</div>
						}
					</div>
					<a href="https://www.skyscanner.com" rel="noopener noreferrer" target="_blank">
						<Fab
					    	type="submit"
					    	variant="extended" 
					    	color="primary" 
					    	aria-label="add" 
					    	size="small"
					    >
				          Check on Skyscanner
				        </Fab>
			        </a>
				</div>
			</div>
		</div>
	)
}

Result.propTypes = {
	search_query: PropTypes.object.isRequired,
	quote: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	search_query: state.search.search_query
})

export default connect(mapStateToProps, {})(Result)