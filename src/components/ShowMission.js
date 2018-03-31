import React from 'react';
import axios from "axios";

const removeMission = index => {
	axios
		.delete(`/todos/${index}`)
		.catch((err) => {
			console.log(err);
		});
		window.location.href = '/';
};

const missionCompleted = props => {
	const {index, points, _id}=props;
	axios
		.patch(`/todos/${index}`)//change status to done
		.then(axios.patch(`/buckets/${points}/${_id}`))
		.catch((err) => {
			console.log(err);
		});
		window.location.href = '/';
};

const editMission = props => {
	window.location.href = `/admin/${props}`;
};

const ShowMission = (...items) => {
	// const init_points = items[1];
	const bucket_id = items[2];
	return items[0].map((item, index) => (
		<div id="missions-for-saving" className="col-sm-6 collapse in" key={index}>
			<div className={`panel panel-primary ${item.isActive ?'':'disabled'} ${item.status !== 'done' ?'':'disabled'}`}>
				<div className={`panel-heading ${item.gender} ${index} `}>
					<button
					className="btn btn-info completed"
					type="button"
					onClick={() => missionCompleted({'index':item._id,'points':item.points, '_id':bucket_id})}>
					<span className="glyphicon glyphicon-edit"></span>Done</button>
					<h3 className="panel-title"> <span className="btn">Mission #{ index+1 } to {item.assignTo}</span></h3>
					<button
					className="btn btn-warning"
					type="button"
					onClick={() => editMission(item._id)}>
					<span className="glyphicon glyphicon-pencil"></span></button>
					<button
					className="btn btn-warning"
					type="button"
					onClick={() => removeMission(item._id)}>
					<span className="glyphicon glyphicon-remove"></span></button>
				</div>
					<div className="panel-body">
						<p>{ item.description } ({ item.points } points)</p>
						<p><i>{item.isActive?`status: ${item.status}`:''}</i></p>
					</div>
			</div>
		</div>
	))
}

const List = (props) => {
	let {missions, assignTo, type, saving_points, _id} = props;
	const filteredElements = typeof (assignTo) === 'undefined' ? missions : missions
		.filter((item, index) => item.assignTo.includes(assignTo) && item.isActive && item.type.includes(type))
	return (
		<div className={`container`}>
			 {ShowMission(filteredElements, saving_points, _id)}
		</div>
	)
}

export default List;
