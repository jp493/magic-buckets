import React, { Component } from 'react';
import axios from "axios";
import { getToken } from "../services/tokenService";

class Admin extends Component {
	state = {
    users: []
  };

	componentDidMount() {
		this.refresh();
	};

	refresh = () => {
		const token = getToken()
		axios.get(`/user/all`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => {
			if (res.status === 200) {
				const users = res.data.payload
				this.setState({ users });
			}
		})
};

	handleDelete = (props) => {
		const {id, username} = props;

		axios
			.delete(`/user/${id}`)
			.catch((err) => {
				console.log(err);
			});
		axios.delete(`/buckets/user/${username}`)
		window.location.href = '/admin';
	};

	render() {
			const {
				users
			} = this.state;

	    return (
				<div>
					<div className="col-sm-6 collapse in">
						<h4>List of all Users</h4>
						<ul className="list-group list-group-flush">
		          {users.map((user, index) => {
		            return <li className="list-group-item">
								{/*{JSON.stringify(user, null, 3)}*/}

								<label for={user.id}><span className={user.username === 'Jane'?'badge':''}><b>{user.username}</b>   </span><span className="glyphicon glyphicon-envelope"> {user.email}</span>
									<input type="radio" value={user._id} name={user._id} id={user._id} />
								</label>
								<button type="button" className="btn btn-link" onClick={()=>this.handleDelete({'id':user._id, 'username': user.username})}>Delete</button>
								</li>
		          })}
		        </ul>
					</div>
				</div>
	    );
	}
}

export default Admin;
