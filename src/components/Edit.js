import React, { Component } from 'react';
import Edit from './Editform';
import axios from "axios";

class Admin extends Component {
	constructor(props) {
    super(props);
    this.state = {missions: [], points: '', status: '', description: '', gender:'', type:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
	// When the compoennt is loaded for the first time.
    componentWillMount() {
        if (this.props.missions) this.setDefaultState(this.props.missions);
    }

    // When the component is loaded again.
    componentWillReceiveProps(nextProps) {
        this.setDefaultState(nextProps);
    }

    // Prefill input fields with the available data by setting default state.
    setDefaultState(missions) {
        // Set state using data.
        this.setState({
            points: missions.points,
            status: missions.status,
						description: missions.description, gender: missions.gender,
						type: missions.type
        })
    }

	componentDidMount() {
		var id = this.props.history.location.pathname.split('/')[2];
		this.refresh(id);
	};

	refresh = (props) => {
		axios.get(`/todos/${props}`).then((res) => {
			if (res.data.payload) {
				this.setState({ missions: res.data.payload });
			}
		})
	};

	handleSubmit = e => {
		e.preventDefault();
		let { missions, points, status, description, gender, type } = this.state;

		var today = new Date().getFullYear();
		description = (description !== undefined) ? description : missions.description;
		status = (status !== undefined) ? status : missions.status;
		gender = (gender !== undefined) ? gender : missions.gender;
		type = (type !== undefined) ? type : missions.type;
		points = (points !== undefined) ? points : missions.points;

		const _id = missions._id;

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
		.then(window.location.href = '/');
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
				<div>
					<div className="col-sm-6 collapse in">
						<h4>Edit a Mission:</h4>
						<Edit
						 missions={missions}
						 handleChange={this.handleChange}
						 handleSubmit={this.handleSubmit} />
					</div>
				</div>
	    )
	}
}

export default Admin;
