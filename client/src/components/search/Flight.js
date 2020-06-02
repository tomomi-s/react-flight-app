import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';

const Flight = ({leg, origin, destination, carrier}) => {
	return (
		<div className="row padding-tb-10 result-flight">
			<div className="col-12 col-lg-4">
				{carrier.Name}
			</div>
			<div className="col-4 text-right col-lg-3">
				{moment(leg.DepartureDate).format('DD/MM')}
			</div>
			<div className="col-8 col-lg-5">
				<div>
					<strong>{origin.IataCode}</strong>
					<i className="fas fa-plane padding-side-10"></i>
					<strong>{destination.IataCode}</strong>
				</div>
			</div>
		</div>
	)
}

export default connect(null, {})(Flight)