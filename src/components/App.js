import React, { Component } from 'react';
// import withAuthentication from './withAuthentication';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import BucketList from './BucketList';
import Mission from './Mission';
import Nav from './Nav';
import signup from './signup';
import login from './signin';
import AddMission from './AddMission';
import Admin from './Admin';
// import firebase from '../firebase';

class MagicBuckets extends Component {
	constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

	componentDidMount() {
	  // firebase.auth.onAuthStateChanged(authUser => {
	  //   authUser
	  //     ? this.setState(() => ({ authUser }))
	  //     : this.setState(() => ({ authUser: null }));
	  // });
		// firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({authUser: true});
    //   }
    // });
	}

	// getUser() {
  //   const user = firebase.auth().currentUser;
  //   if (this.state.authUser) {
  //     return (
  //       <div>
  //         Logged in as: {user.email}
  //       </div>
  //     );
  //   }
  // }

  requireAuth(nextState, replace) {
    if (!this.state.authUser) {
      replace({
        pathname: '/',
      })
    }
  }

	render () {
		console.log(this.state);
		return (
			<Router>
				<div>
					<Nav />
					<Route path="/signin" component={login} />
					<Route path="/signup" component={signup} />
					<Route path="/list" component={Mission} />
					<Route path="/bucket" component={BucketList} />
					<Route path="/add" component={AddMission} />
					<Route path="/admin" component={Admin} />
				</div>
			</Router>
	  )
	}
}

export default MagicBuckets;
