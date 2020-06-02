import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = ({title, icon}) => {
	return (
		<nav className="navbar">
		  <Link to="/" className="navbar-brand" href="#">
		    <i className={icon} style={{marginLeft: 15}}/> {title}
		  </Link>
		</nav>
	)
}

NavBar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
}

NavBar.defaultProps = {
	title: 'React Flight Search',
	icon: 'fas fa-plane-departure'
}

export default NavBar;