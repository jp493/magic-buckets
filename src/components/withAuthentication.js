import React, { Component } from 'react';
import { firebase } from '../firebase';
import PropTypes from 'prop-types';

const withAuthentication = (Component) => {
  class WithAuthentication extends Component {
		constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

		getChildContext() {
      return {
        authUser: this.state.authUser,
      };
    }

    render() {
      return (
        <Component />
      );
    }
  }

	WithAuthentication.childContextTypes = {
    authUser: {authUser:null},//PropTypes.object,
  };

  return WithAuthentication;
}

export default withAuthentication;
