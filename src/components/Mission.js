import React, { Component } from 'react';
import ShowMission from './ShowMission';
import axios from "axios";

class MissionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mission: '',
			assignTo: '',
			missions: [],
			saving_points: 0,
			_id: ''
		};
	};

	refresh = () => {
		axios.get("/todos").then((res) => {
			if (res.data.payload) {
				this.setSate({ missions: res.data.payload });
			}
		});
	};

	render() {
		const { missions, assignTo, type, saving_points, _id } = this.props;

    return (
				<div className="container">
					<ShowMission
					 missions={missions}
					 assignTo={assignTo}
					 type={type}
					 saving_points={saving_points}
					 _id={_id}
					/>
				</div>
    );
  }
}

export default MissionList;
