import React, { Component } from 'react';
// import withAuthentication from './withAuthentication';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import BucketList from './BucketList';
import Mission from './Mission';
import Nav from './Nav';
import signup from './signup';
import login from './signin';
import firebase from '../firebase';

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
	}

	render () {
		return (
			<Router>
				<div>
					<Nav />
					<Route path="/signin" component={login} />
					<Route path="/signup" component={signup} />
					<Route path="/list" component={Mission} />
					<Route path="/bucket" component={BucketList} />
				</div>
			</Router>
	  )
	}
}

export default MagicBuckets;
