import React from 'react';
import video from './../assets/video/The-Coast.mp4';
import SearchForm from './search/SearchForm';
const Home = () => {
	return (
		<div id="home" className="">
			<div className="overlay"></div>
			<video autoPlay loop muted id="homeVideo">
			  <source src={video} type="video/mp4" />
			</video>
			<div className="container h-100">
			    <div className="d-flex h-100 align-items-center">
			      <div className="w-100 text-white search-container">
			        <h1>Where to?</h1>
			        <SearchForm />
			      </div>
			    </div>
			</div>
		</div>
	)
}

export default Home;