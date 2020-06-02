import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import AsyncSelect from 'react-select/async';
import { getPlaces } from '../../action/searchActions';

const Place = ({getPlaces, onPlaceSelected}) => {
	const handleInputChange = (newValue: string) => {
	    const inputValue = newValue.replace(/\W/g, '');
	    return inputValue;
	};

	const customStyles = {
	  option: (provided, state) => ({
	    ...provided,
	    color: 'black'
	  }),
	  control: (provided) => ({
	    ...provided,
	    marginTop: "5%",
	  })
	}


	const promiseOptions = inputValue =>
	  new Promise(resolve => {
	  	if (!inputValue) {
		      resolve([]);
		}else{
		    setTimeout(() => {
		      resolve(getPlaces(inputValue));
		    }, 1000);
		}
	});

	const handleChange = (selectedOption) => {
		if(selectedOption){
			onPlaceSelected(selectedOption)
		}
		console.log(`Option selected:`, selectedOption);
	}

	return (
		<AsyncSelect
	      cacheOptions
	      loadOptions={promiseOptions}
	      defaultOptions
	      valueKey="PlaceId"
	      //value={PlaceId}
	      labelKey="PlaceName"
	      onChange={handleChange}
	      onInputChange={handleInputChange}
	      styles = { customStyles }
	      placeholder={'Country, city or airport'}
	      isClearable
	      required
	    />
    )
}

Place.propTypes = {
	getPlaces: PropTypes.func.isRequired,
	onPlaceSelected: PropTypes.func.isRequired,
}

export default connect(null, {getPlaces})(Place);