import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './signup';
import axios from "axios";
import { setToken } from "../services/tokenService";

const LoginInPage = (props) =>
	<div className="container">
		<LoginInForm
			currentUser={props.currentUser}
		/>
		<hr />
		<SignUpLink />
	</div>

class LoginInForm extends Component {
	state = {
    email: "",
    password: ""
  }

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		const {
			email,
			password,
		} = this.state;

		axios.post('/auth/signin', {
			email,
			password
		}).then(res => {
			if (res.status === 200) {
				const token = res.data.payload;
				setToken(token);
				this.props.currentUser();
			}
		})
		.catch(error => {
			// this.setState(byPropKey('error', error));
		})
	};

	render() {
		const {
			email,
			password,
			// error,
		} = this.state;

		const isInvalid =
	      password === '' || email === '';

		return (
			<div className="main-login main-center">
				<form className="form-horizontal" onSubmit={this.onSubmit}>
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

					<div className="form-group ">
							<button type="submit" className="btn btn-primary btn-lg btn-block login-button"  disabled={isInvalid}>Login In</button>
					</div>

					{/* { error && <p> {error.message}</p> } */}
				</form>
			</div>
		);
	}
}

export default withRouter(LoginInPage);
export  {
	LoginInForm
};
