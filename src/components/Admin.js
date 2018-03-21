import React, { Component } from 'react';
// import AddMission from './AddMission';
import Edit from './Edit';
import axios from "axios";

class Admin extends Component {
	constructor(props) {
    super(props);
    this.state = {missions: [], points: '', status: '', description: '', gender:'', type:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

	componentDidMount() {
		var id = this.props.history.location.pathname.split('/')[2];
		this.refresh(id);
	};

	refresh = (props) => {
		// axios.get("/buckets").then((res) => {
		// 	if (res.data.payload) {
		// 		this.setState({ buckets: res.data.payload });
		// 	}
		// }); TODO: remove if only config missions
		axios.get(`/todos/${props}`).then((res) => {
			if (res.data.payload) {
				this.setState({ missions: res.data.payload });
			}
		});
	};

	handleSubmit = e => {
		e.preventDefault(); // to avoid refresh page auto
		let { missions, points, status, description, gender, type } = this.state;

		var today = new Date().getFullYear();
		description = (description !== '') ? description : missions.description;
		status = (status !== '') ? status : missions.status;
		gender = (gender !== '') ? gender : missions.gender;
		type = (type !== '') ? type : missions.type;

		const _id = missions._id; //'5aa8957fd153a87d0dfba1e7';

		axios.post(`/todo/${_id}/edit`, {
			assignTo:missions.assignTo,
			description:description,
			type:type,
			gender:gender,
			status:status,
			points:parseInt(points),
			createdBy:today,
			isActive:true
		})
		.then(this.refresh);
	};

	handleChange = (e) => {
		if (e.target.value !== '') {
			this.setState({
				[e.target.name]:e.target.value
			})
		}
	};

	render() {
			const {
				missions
			} = this.state;

	    return (
				<div className="col-sm-6 collapse in">
					 <Edit
					 	missions={missions}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit} />
				</div>
	    );
	}
}

export default Admin;
