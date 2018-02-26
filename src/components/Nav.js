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
	    <li><Link to={routes.LANDING}>Landing</Link></li>
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
	    <li><Link to={routes.LANDING}>Landing</Link></li>
	    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
	  </ul>
	</nav>

// const Nav = () =>
// 	<nav className="navbar navbar-default">
// 		<div className="navbar-header">
//        <Link className="navbar-brand" to="/">MAGIC BUCKETS</Link>
//     </div>
//     <ul className="nav navbar-nav">
//       <li><Link to={routes.LANDING}>List</Link></li>
//       <li><Link to={routes.HOME}>Home</Link></li>
//       <li><Link to={routes.ACCOUNT}>Account</Link></li>
//     </ul>
// 		<ul className="nav navbar-nav navbar-right">
//       <li><Link to={routes.SIGN_IN}><button className="btn btn-info log">Sign In</button></Link></li>
//       <li><button className="btn btn-danger log">Log out </button></li>
//     </ul>
// 	</nav>

// class Nav extends Component {
//
//   render() {
//     return (
// 			<nav className="navbar navbar-default">
//         <div className="navbar-header">
//           <Link className="navbar-brand" to="/">MAGIC BUCKETS</Link>
//         </div>
// 				<ul className="nav navbar-nav">
//           <li>
//             <Link to={routes.LANDING}>List</Link>
//           </li>
//           <li>
//            <Link to="/profile">My Account</Link>
//           </li>
// 					<li>
//            <Link to="/admin">Admin</Link>
//           </li>
//         </ul>
//         <ul className="nav navbar-nav navbar-right">
//           {/*}<li><button className="btn btn-info log"><Link to={routes.SIGN_IN}>Log In</Link></button></li>
//           <li><button className="btn btn-danger log">Log out </button></li>*/}
// 					<li><SignOutButton /></li>
//         </ul>
//       </nav>
//     );
//   }
// }

export default Nav;
