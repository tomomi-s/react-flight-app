import{
	SET_LOADING, 
	SEARCH_ERROR, 
	SEARCH_QUERY, 
	GET_QUOTES,
	CLEAR_ERRORS
} from './types';
import axios from 'axios';
import moment from 'moment';

// Get logs from server
export const getPlaces = (query) => async dispatch => {
	try{
	    const places = await axios.get(`/api/places/${query}`)

		const places_data = places.data.Places;
		const change_places_format = (places_data) => {
			return new Promise((resolve, reject) => {
		    	const new_format_places = places_data.map(place => {
		    		return {
		    			...place,
		    			value: place.PlaceId,
		    			label: place.PlaceName += ` — ${place.CountryName}  (${place.PlaceId.replace('-sky', '')})`
		    		}
		    	})
		    	resolve(new_format_places)
			});
		}

		const modified_places = await change_places_format(places_data);
		return modified_places;
	}catch(err){
		dispatch({
			type: SEARCH_ERROR,
			payload: err.response.statusText
		})
	}		
}

export const searchFlight = (query) => async dispatch => {
	try{
		clearErrors();
		setLoading();

		const departure_date = moment(query.selectedDepartDate).format('YYYY-MM-DD');
		const return_date = moment(query.selectedReturnDate).format('YYYY-MM-DD');
		const search_query = {...query, departure_date, return_date}
		dispatch({
			type: SEARCH_QUERY,
			payload:search_query
		})

	    const results = await axios.post(`/api/browse_price`, search_query)
	    
	    const quoets = results.data.Quotes;
	    const places = results.data.Places;
	    const carriers = results.data.Carriers;
	    function populate(quote){
	    	const outbound_place_origin = places.find(x=> x.PlaceId === quote.OutboundLeg.OriginId);
	    	const outbound_place_destination = places.find(x=> x.PlaceId === quote.OutboundLeg.DestinationId);
	    	const outbound_carrier = carriers.find(x=> x.CarrierId === quote.OutboundLeg.CarrierIds[0]);
	    	const inbound_place_origin = places.find(x=> x.PlaceId === quote.InboundLeg.OriginId);
	    	const inbound_place_destination = places.find(x=> x.PlaceId === quote.InboundLeg.DestinationId);
	    	const inbound_carrier = carriers.find(x=> x.CarrierId === quote.InboundLeg.CarrierIds[0]);
	    	return {...quote, outbound_place_origin, outbound_place_destination, outbound_carrier, inbound_place_origin, inbound_place_destination, inbound_carrier}
	    }

    	const populated_date = quoets.map(async(quote)=>{
    		const populated_quote = await populate(quote);
    		return populated_quote;

    	})
	    
	    Promise.all(populated_date).then((results)=>{
	    	const sorted_results = results.sort((a, b)=>{return a.MinPrice - b.MinPrice});
	    	console.log(sorted_results)
	    	dispatch({
				type: GET_QUOTES,
				payload: sorted_results
			})
	    })

	}catch(err){
		console.log(err)
		dispatch({
			type: SEARCH_ERROR,
			payload: err.response.statusText
		})
	}
}


// Set loading to true
export const setLoading = () => {return {type: SET_LOADING}}

//Clear Errors
export const clearErrors = () => {
	return{type: CLEAR_ERRORS}
}
