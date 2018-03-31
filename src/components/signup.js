import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../constants/route';
import axios from "axios";

const SignUpPage = ({ history }) =>
		<SignUpForm history={history} />

const Initial_State = {
	username: '',
	email: '',
	password: '',
	confirmation: '',
	gender: '',
	theme: '',
	error: null,
};

class SignUpForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...Initial_State };
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	createBuckets = () => {
		for (var i = 0; i < 3; i++) {
			var type, isFull = false,
			points = ( i === 0 ) ? 50 : 0 ,
			belongsTo = this.state.username;

			if (i === 0) {
				type = "Saving"
			} else if (i ===1){
				type = "Giving"
			} else if (i ===2){
				type = "Spending"
			}

			axios
				.post('/buckets', {type, isFull, points, belongsTo})
		}
	}

	onSubmit = (e) => {
		const {
			username,
			email,
			password,
		} = this.state;

		const { history } = this.props;

		e.preventDefault();
		axios
			.post('/auth/signup', {email, password, username})
			.then(
					authUser =>
					this.setState(() => ({ ...Initial_State })),
					this.createBuckets(),
					history.push(routes.HOME)
			)
			.catch((err) => {
				// this.setState(byPropKey('error', error));
			});
	}

	render() {
		const {
			username,
			email,
			password,
			confirmation,
			// error,
		} = this.state;

		const isInvalid =
	      password !== confirmation ||
	      password === '' ||
	      email === '' ||
	      username === '';

		return (
			<div className="main-login main-center">
				<form className="form-horizontal" onSubmit={this.onSubmit}>
					<div className="form-group">
						<label className="cols-sm-2 control-label">Your Name</label>
						<div className="cols-sm-10">
							<div className="input-group login-form">
								<span className="input-group-addon"><i className="glyphicon glyphicon-share" aria-hidden="true"></i></span>
								<input
									name='username'
									id='username'
									value={username}
									onChange={this.handleChange}
									type='text'
									className="form-control"
									placeholder='Nickname'
								/>
							</div>
						</div>
					</div>

					<div className="form-group">
						<label className="cols-sm-2 control-label">Your Email</label>
						<div className="cols-sm-10">
							<div className="input-group login-form">
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
							<div className="input-group login-form">
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

					<div className="form-group">
						<label className="cols-sm-2 control-label">Confirm Password</label>
						<div className="cols-sm-10">
							<div className="input-group login-form">
								<span className="input-group-addon"><i className="glyphicon glyphicon-check" aria-hidden="true"></i></span>
								<input
									name='confirmation'
									id='confirmation'
									value={confirmation}
									onChange={this.handleChange}
									type='password'
									className="form-control"
									placeholder='Confirm Password'
								/>
							</div>
						</div>
					</div>

					<div className="form-group">
              <label className="control-label col-sm-2 gender">Gender</label>
              <div className="col-sm-10">
                  <div className="row">
                      <div className="col-sm-6">
                          <label className="radio-inline">
                              <input type="radio" id="boyRadio" value="B" />Boy
                          </label>
													<label className="radio-inline">
                              <input type="radio" id="girlRadio" value="G" />Girl
                          </label>
                      </div>
          				</div>
								</div>
          </div>

					<div className="form-group">
              <label className="col-sm-2 control-label theme">Theme</label>
              <div className="col-sm-4">
                  <select id="Select" className="form-control">
                      <option>Select</option>
                      <option>Earth</option>
                      <option>Mars</option>
                      <option>Saturn</option>
                      <option>Uranus</option>
                      <option>Jupiter</option>
                      <option>Neptune</option>
                      <option>Venus</option>
                  </select>
              </div>
          </div>

					<div className="form-group ">
							<button type="submit" className="btn btn-primary btn-lg btn-block login-button"  disabled={isInvalid}>Register</button>
					</div>

					{/*  { error && <p> {error.message}</p> }  */}
				</form>
			</div>
		);
	}
}

const SignUpLink = () =>
	<div>
		Don{'\''}t have an accout?
		{' '}
		<Link to={routes.SIGN_UP}>Sign Up</Link>
	</div>

export default withRouter(SignUpPage);

export {
	SignUpForm,
	SignUpLink,
};
