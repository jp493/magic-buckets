import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import * as routes from '../constants/route';
import SignOutButton from './signout';
import PropTypes from 'prop-types';

const Nav = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

	Nav.contextTypes = {
	  authUser: PropTypes.object,
	};

const NavigationAuth = () =>
	<nav className="navbar navbar-default">
		<div className="navbar-header">
       <Link className="navbar-brand" to="/">MAGIC BUCKETS</Link>
    </div>
	  <ul className="nav navbar-nav">
	    <li><Link to={routes.BUCKET}>My Buckets</Link></li>
	    <li><Link to={routes.LANDING}>My Missions</Link></li>
	    <li><Link to={routes.HOME}>Home</Link></li>
	    <li><Link to={routes.ACCOUNT}>Account</Link></li>
	  </ul>
		<ul className="nav navbar-nav navbar-right">
      <li><SignOutButton /></li>
    </ul>
	</nav>

const NavigationNonAuth = () =>
	<nav className="navbar navbar-default">
		<div className="navbar-header">
			 <Link className="navbar-brand" to="/">MAGIC BUCKETS</Link>
		</div>
	  <ul className="nav navbar-nav navbar-right">
			<li><Link to={routes.BUCKET}>My Buckets</Link></li>
			<li><Link to={routes.ADMIN}>App Config</Link></li>
	    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
	  </ul>
	</nav>

export default Nav;
