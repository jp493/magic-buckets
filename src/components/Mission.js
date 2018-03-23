import React, { Component } from 'react';
import AddMission from './AddMission';
import ShowMission from './ShowMission';
import axios from "axios";
import SkyLight from 'react-skylight';

class MissionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mission: '',
			assignTo: '',
			missions: [],
			saving_points: 0
		};
	};

  _executeAfterModalClose(){
    window.location.href = '/bucket'
  }

	clearInput = () => {
    this.setState({ mission: "", assignTo: ""});
  };

	refresh = () => {
		axios.get("/todos").then((res) => {
			if (res.data.payload) {
				this.setSate({ missions: res.data.payload });
			}
		});
	};

  addMission = () => {
		const {mission,assignTo,points,type}=this.state;
		axios
			.post(`/todos/${mission}&${assignTo}&${points}&${type}`)
			.then(this.refresh)//this.props.refresh
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

	render() {
		const { missions, assignTo, type, saving_points } = this.props;

    return (
				<div className="container">
					<ShowMission
					 missions={missions}
					 assignTo={assignTo}
					 type={type}
					 saving_points={saving_points}
					/>
					 <div className="col-md-10">
 						<AddMission
 							handleChange={this.handleChange}
 							addMission={this.addMission}
 							mission={this.state.mission}
 						/>
 					</div>
					<SkyLight
	          afterClose={this._executeAfterModalClose}
	          ref={ref => this.dialogWithCallBacks = ref}
	          title="Success">
	            You have added mission successfully!
	        </SkyLight>
				</div>
    );
  }
}

export default MissionList;
