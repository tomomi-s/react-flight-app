import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import SearchInfo from '../search/SearchInfo';
import Error from '../layout/Error';
import Result from '../result/Result';
import LinearProgress from '@material-ui/core/LinearProgress';
import { clearErrors } from '../../action/searchActions';

const Results = ({search:{search_query, quotes, loading, error}, clearErrors}) => {
	const numberPerLoad = 10;
	const [limit, setLimit] = useState(numberPerLoad);

	useEffect(() => {
		clearErrors();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const loadMore = () =>{
		const number = limit + numberPerLoad;
		setLimit(number)
	}

	return (
		<div id="results">
			<div className="container">
				<h3 className="font-white text-center">Search Results</h3>
				{
					search_query !== null && (
						<SearchInfo />
					)
				}
				{
					loading  ?  <LinearProgress />
					: (
						error ? 
							<Error error={error}
							button="Search Again"
							href="/"
							/> : (
								quotes.length === 0 ? (
									<div className="text-center">
										<h2 className="text-center text-white">
											No results.
										</h2>
										<Fab 
											href="/"
											variant="extended" 
				    						color="primary" 
				    						aria-label="add"
										>
											Search Again
										</Fab>
									</div>
								) : (
									<div>
										<h4 className="font-white text-center">{quotes.length} Results</h4>
										{
											quotes.slice(0, limit).map(quote => <Result quote={quote} key={quote.QuoteId} />)
										}
										{
											quotes.length - limit > 0 ? 
												<div className="row">
													<div className="col-12 text-center">
														<button type="button" className="btn btn-light btn-lg" onClick={loadMore}>Show more...</button>
													</div>
												</div>
											 : null
										}
										
									</div>
								)
							)
						)
				}
			</div>
		</div>
	)
}

Results.propTypes = {
	search: PropTypes.object.isRequired,
	clearErrors: PropTypes.func,
	error: PropTypes.string,
}

const mapStateToProps = state => ({
	search: state.search
})

export default connect(mapStateToProps, {clearErrors})(Results)

