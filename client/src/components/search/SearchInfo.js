import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import moment from 'moment';

const SearchInfo = ({search:{search_query}}) => {
	return (
		<div className="font-white">
			<div className="row">
				<div className="d-none d-lg-block col-12 text-center">
					{search_query.selectedDepartureName}
					<i className="fas fa-plane padding-side-10"></i>
					{search_query.selectedReturnName}
				</div>
				<div className="d-lg-none col-12 text-center">
					<div>{search_query.selectedDepartureName}</div>
					<div><i className="fas fa-plane padding-side-10"></i></div>
					<div>{search_query.selectedReturnName}</div>
				</div>
				<div className="col-12 text-center">
					Date: {moment(search_query.selectedDepartDate).format('DD/MM/YYYY')} - {moment(search_query.selectedReturnDate).format('DD/MM/YYYY')}
				</div>
				<div className="col-12 text-center">
					Passengers: {search_query.Passenger}
				</div>
			</div>
		</div>
	)
}

SearchInfo.propTypes = {
	search: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	search: state.search
})

export default connect(mapStateToProps, {})(SearchInfo)

