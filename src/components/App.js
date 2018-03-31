import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import BucketList from './BucketList';
import Nav from './Nav';
import Signup from './signup';
import Login from './signin';
import AddMission from './AddMission';
import Admin from './Admin';
import Welcome from './Welcome';
import SkyLight from 'react-skylight';
import { getToken } from "../services/tokenService";
import axios from "axios";

class MagicBuckets extends Component {
	state = {
      user: null,
			mission: '',
			assignTo: '',
			missions: []
  }

	componentDidMount() {
		this.currentUser()
	}

	setUser = user => {
		this.setState({ user })
  }

	currentUser = () => {
		const token = getToken();
		if (token) {
			axios.get('/user/current', {
				headers: {
					Authentication: `Bearer ${token}`
				}
			})
			.then(res => {
				if (res.status === 200) {
					const user = res.data.payload
					this.setUser(user)
				}
			})
		}
	};

	addMission = () => {
		const {mission,assignTo,points,type}=this.state;
		axios
			.post(`/todos/${mission}&${assignTo}&${points}&${type}`)
			.then()//this.refresh)
			.catch((err) => {
				console.log(err);
			});
    this.clearInput();
		this.dialogWithCallBacks.show();
  };

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	clearInput = () => {
		this.setState({ mission: "", assignTo: ""});
	};

  _executeAfterModalClose(){
    window.location.href = '/bucket'
  }

	render () {
		return (
			<Router>
				<div>
					<Nav
						authUser={this.state.user}
						setUser={this.setUser}
					/>
					<Switch>
					<Route exact path="/signin" render={() => {
						if (this.state.user) {
							return <BucketList username={this.state.user.username} />
						} else {
							return <Login currentUser={this.currentUser} />
						}
					}} />
						<Route exact path="/signup" component={Signup} />
						<Route path="/add" render={() => {return <AddMission
							handleChange={this.handleChange}
							addMission={this.addMission}
	 						mission={this.state.mission} />
						}} />
						<Route exact path="/"
						render={() => {
							if (this.state.user) {
								return <BucketList
								setUser={this.setUser}
								username={this.state.user.username} />
							} else {
								return <Welcome />
							}
						}} />
						<Route path="/admin" component={Admin} />
						<Route exact path="/welcome" component={Welcome} />
					</Switch>
					<SkyLight
	          afterClose={this._executeAfterModalClose}
	          ref={ref => this.dialogWithCallBacks = ref}
	          title="Success">
	            You have added mission successfully!
	        </SkyLight>
				</div>
			</Router>
	  );
	}
}

export default MagicBuckets;
