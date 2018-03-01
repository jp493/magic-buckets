import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './signup';
import * as routes from '../constants/route';
import auth from '../firebase';

const LoginInPage = ({ history }) =>
	<div className="container">
		<LoginInForm history={history} />
		<hr />
		<SignUpLink />
	</div>

const Initial_State = {
	email: '',
	password: '',
	error: null,
};



class LoginInForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...Initial_State };
	}

	handleChange = (e) => {
		this.setState({
			/*
				ES6 property, it can used for all components name, defined in element's name
				The benefit of doing this is to use this func for multipal changes.
			*/
			[e.target.name]: e.target.value
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		const {
			email,
			password,
		} = this.state;

		const byPropKey = (propertyName, value) => () => ({
		  [propertyName]: value,
		});

		const { history } = this.props;

		auth.doSignInWithEmailAndPassword(email, password)
			.then(authUser => {
				this.setState(() => ({ ...Initial_State }));
				history.push(routes.HOME);
			})
			.catch(error => {
				this.setState(byPropKey('error', error));
			});

		e.preventDefault();
	}

	render() {
		const {
			email,
			password,
			error,
		} = this.state;

		const isInvalid =
	      password === '' || email === '';

		return (
			<div className="main-login main-center">
				<form className="form-horizontal" onSubmit={this.onSubmit}>
					<div className="form-group">
						<label className="cols-sm-2 control-label">Your Email</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"><i className="glyphicon glyphicon-list-alt" aria-hidden="true"></i></span>
								<input
									name='email'
									id='email'
									value={email}
									onChange={this.handleChange}
									type='text'
									className="form-control"
									placeholder='Email Address'
								/>
							</div>
						</div>
					</div>

					<div className="form-group">
						<label className="cols-sm-2 control-label">Your Password</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon"><i className="glyphicon glyphicon-dashboard" aria-hidden="true"></i></span>
								<input
									name='password'
									id='password'
									value={password}
									onChange={this.handleChange}
									type='password'
									className="form-control"
									placeholder='Password'
								/>
							</div>
						</div>
					</div>

					<div className="form-group ">
							<button type="submit" className="btn btn-primary btn-lg btn-block login-button"  disabled={isInvalid}>Login In</button>
					</div>

					{ error && <p> {error.message}</p> }
				</form>
			</div>
		);
	}
}

export default withRouter(LoginInPage);

export {
	LoginInForm,
};
