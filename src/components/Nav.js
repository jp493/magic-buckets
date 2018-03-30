import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import * as routes from '../constants/route';
import SignOutButton from './signout';

const Nav = (props) =>
  <div>
    { props.authUser
        ? <NavigationAuth setUser={props.setUser}/>
        : <NavigationNonAuth />
    }
  </div>
const NavigationAuth = (props) =>
	<nav className="navbar navbar-default">
		<div className="navbar-header">
       <Link className="navbar-brand" to="/">MAGIC BUCKETS</Link>
    </div>
	  <ul className="nav navbar-nav">
	    <li><Link to={routes.BUCKET}>My Buckets</Link></li>
	    <li><Link to={routes.ADD}>Add a Mission</Link></li>
	  </ul>
		<ul className="nav navbar-nav navbar-right">
      <li><SignOutButton setUser={props.setUser}/></li>
    </ul>
	</nav>

const NavigationNonAuth = () =>
	<nav className="navbar navbar-default">
		<div className="navbar-header">
			 <Link className="navbar-brand" to="/">MAGIC BUCKETS</Link>
		</div>
	  <ul className="nav navbar-nav">
			<li><Link to={routes.WELCOME}>Welcome</Link></li>
	    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
	  </ul>
	</nav>

export default Nav;
