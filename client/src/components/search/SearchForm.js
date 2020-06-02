import 'date-fns';
import React , {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import Place from './Place';

import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Fab from '@material-ui/core/Fab';
import { searchFlight, clearErrors } from '../../action/searchActions';

const useStyles = makeStyles(theme => ({
  TextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


const SearchForm = ({props, searchFlight, clearErrors, error}) => {
	useEffect(() => {
		return () => {
			clearErrors();
		};
	}, [])
	
	let history = useHistory();
	const classes = useStyles();

	const today = new Date(new Date().setHours(0,0,0,0));
	const [searchInfo, setSearchInfo] = useState({
		selectedDeparture: '',
		selectedReturn: '',
		selectedDepartureName: '',
		selectedReturnName: '',
		selectedDepartDate: new Date(today.setDate(today.getDate() + 1)),
		selectedReturnDate: new Date(today.setDate(today.getDate() + 7)),
		Passenger: 1,
	});

	const { selectedDeparture, selectedReturn, selectedDepartDate, selectedReturnDate, Passenger } = searchInfo;

	const handleDate = (n) => (date) => {
		if(n === 1){
			console.log(1)
			if(date >= selectedReturnDate){
				console.log(date)
				console.log(selectedReturnDate)
				console.log(new Date(date.setDate(date.getDate() + 7)))
				setSearchInfo({...searchInfo, 
					selectedDepartDate: date, 
					selectedReturnDate: new Date(date.setDate(date.getDate() + 7))})
				console.log(searchInfo)
			}
			else{
				setSearchInfo({...searchInfo, selectedDepartDate: date})
			}
		}else if(n === 2){
			console.log(2)
			setSearchInfo({...searchInfo, selectedReturnDate: date})
			console.log(searchInfo)
		}
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(searchInfo)
		searchFlight(searchInfo);
		history.push('/result');		
	}

	

	return (
		<div className="search-form-container">
			<form noValidate autoComplete="off" onSubmit={handleSubmit} >
				<div className="row">
					<div className="col-md-6 col-lg-3 form-group">
						<div className="MuiFormLabel-root MuiInputLabel-shrink">From</div>
						<Place
							value={selectedDeparture}
							onPlaceSelected={place => setSearchInfo({...searchInfo, selectedDeparture: place.PlaceId, selectedDepartureName: place.PlaceName })}
						/>
			        </div>

				    <div className="col-md-6 col-lg-3 form-group">
						<div className="MuiFormLabel-root MuiInputLabel-shrink">To</div>
						<Place
							value={selectedReturn}
							onPlaceSelected={place => setSearchInfo({...searchInfo, selectedReturn: place.PlaceId, selectedReturnName: place.PlaceName})}
						/>
			        </div>

				    <MuiPickersUtilsProvider 
				     utils={DateFnsUtils}
				    >
				    	<div className="col-md-4 col-lg-2">
						    <KeyboardDatePicker
					          disableToolbar
					          variant="inline"
					          autoOk
					          format="dd/MM/yyyy"
					          disablePast
					          margin="normal"
					          label="Depart"
					          value={selectedDepartDate}
					          name="selectedDepartDate"
					          onChange={handleDate(1)}
					          
					        />
				        </div>
				        <div className="col-md-4 col-lg-2">
					        <KeyboardDatePicker
					          disableToolbar
					          variant="inline"
					          autoOk
					          format="dd/MM/yyyy"
					          disablePast
					          minDate={selectedDepartDate}
					          margin="normal"
					          label="Return"
					          value={selectedReturnDate}
					          onChange={handleDate(2)}
					          KeyboardButtonProps={{
					            'aria-label': 'change date',
					          }}
					        />
				        </div>
			        </MuiPickersUtilsProvider>

			        <div className="col-md-4 col-lg-2">
				        <TextField
				          id="passengers"
				          label="Passengers"
				          type="number"
				          InputLabelProps={{
				           shrink: true,
				          }}
				          value = {Passenger}
				          onChange={e => setSearchInfo({...searchInfo, Passenger: Number(e.target.value)})}
				          margin="normal"
				          inputProps={{ min: 1 }}
				        />
				    </div>
			    </div>

			    <div className="row margin-top-10">
			    	<div className="col-12 text-right">
					    <Fab
					    	type="submit"
					    	variant="extended" 
					    	color="primary" 
					    	aria-label="add"
					    	disabled={!selectedDeparture || !selectedReturn}
					    	className={classes.margin}
					    >
				          Search Flights
				        </Fab>
			    	</div>
			    </div>
			</form>
		</div>
	)
}

SearchForm.propTypes = {
	searchFlight: PropTypes.func.isRequired,
	clearErrors: PropTypes.func,
	error: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
	error: state.search.error,
	props: ownProps
})

export default connect(mapStateToProps, {searchFlight, clearErrors})(SearchForm);