import{
	SET_LOADING, 
	SEARCH_QUERY, 
	GET_QUOTES,
	SEARCH_ERROR,
	CLEAR_ERRORS
} from '../action/types';

const initialState = {
	options: [],
	search_query: null,
	quotes: [],
	loading: false,
	error: null
}

export default (state = initialState, action) => {
	switch(action.type){
		case SEARCH_QUERY:
			return{
				...state,
				search_query: action.payload
			}
		case GET_QUOTES:
			return{
				...state,
				quotes: action.payload,
				loading: false
			}
		case SET_LOADING:
			return{
				...state,
				loading: true
			}
		case SEARCH_ERROR:
			return{
				...state,
				error: action.payload,
				loading: false
			}
		case CLEAR_ERRORS: 
			return{
				...state,
				error: null
			}
		default: 
			return state;
	}
}