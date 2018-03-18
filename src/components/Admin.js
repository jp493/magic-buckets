import React, { Component } from 'react';
// import AddMission from './AddMission';
import axios from "axios";


class Admin extends Component {
	constructor(props) {
    super(props);
    this.state = {missions: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	componentDidMount() {
		this.refresh();
	}

	refresh = () => {
		// axios.get("/buckets").then((res) => {
		// 	if (res.data.payload) {
		// 		this.setState({ buckets: res.data.payload });
		// 	}
		// }); TODO: remove if only config missions
		axios.get("/todos").then((res) => {
			if (res.data.payload) {
				this.setState({ missions: res.data.payload });
			}
		});
	};

	handleSubmit = e => {
		e.preventDefault(); // to avoid refresh page auto
		const { missions } = this.state;
		const today = new Date().getFullYear();
		const _id = '5aa8957fd153a87d0dfba1e7';

		axios.post(`/todo/${_id}/edit`, {
			description:missions[2].description,
			assignTo:missions[2].assignTo,
			type:missions[2].type,
			gender:'G',
			status:missions[2].status,
			points:missions[2].points,
			createdBy:today,
			isActive:true
		})
		.then(this.refresh);
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
	    return (
	        <form onSubmit={this.handleSubmit} method="post">
	            <div className="container">
	            {this.state.missions.map((item, key) => (
	                <div className="">
			                {/*<h2>{bucket.type}</h2>
			                <p>{bucket.isFull}</p>
			                <p>{bucket.points}</p>
			                <p>{bucket.belongsTo}</p>*/}
											<p>{key}</p>
											<p>AssignTo: <input name="assignTo" value={item.assignTo} onChange={this.handleChange} /></p>
											<p>Gender: <input name="gender" onChange={this.handleChange} /></p>
											<p>points: <input name="points" value={item.points} onChange={this.handleChange} /></p>
											<p>createdBy: <input name="createdBy" value={item.createdBy} onChange={this.handleChange} /></p>
											<p>status: <input name="status" value={item.status} onChange={this.handleChange} /></p>
											<p>description: <br /><textarea name="description" value={item.description} onChange={this.handleChange} /></p>
											<p>Bucket type:<input name="type" value={item.type} onChange={this.handleChange} /></p>
											<input type="hidden" value={item._id} name="_id" />
	                </div>
	            ))}
	            </div>
							<button type="submit">Submit</button>
	        </form>
	    );
	}
}

export default Admin;
