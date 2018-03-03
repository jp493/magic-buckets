import React, { Component } from 'react';
import AddMission from './AddMission';
import ShowMission from './ShowMission';
import axios from "axios";

class MissionList extends Component {
	constructor() {
		super();
		this.state = {
			mission: '',
			assignTo: '',
			missions: []
		};
	}

	componentDidMount() {
		this.refresh();
	}

	clearInput = () => {
    this.setState({ mission: "" });
  };

	refresh = () => {
		axios.get("/todos").then((res) => {
			this.setState({ missions: res.data.items });
		});
	};

  addMission = () => {
		const {mission,assignTo}=this.state;
		axios
			.post(`/todos/${mission}&${assignTo}`)
			.then(this.refresh)
			.catch((err) => {
				console.log(err);
			});
    this.clearInput();
  };

	handleChange = e => {
    this.setState({
			[e.target.name]: e.target.value
    });
  };

	render() {
		const { missions, assignTo, type } = this.props;

    return (
				<div className="container">
					<div className="col-md-3">
						<AddMission
							handleChange={this.handleChange}
							addMission={this.addMission}
							mission={this.state.mission}
						/>
					</div>
					<ShowMission
					 missions={missions}
					 assignTo={assignTo}
					 type={type} />
				</div>
    );
  }
}

export default MissionList;
