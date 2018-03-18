import React from 'react';
import axios from "axios";

const state = {
	isEdit: false
};

const removeMission = index => {
	axios
		.delete(`/todos/${index}`)
		.catch((err) => {
			console.log(err);
		});
		window.location.href = '/bucket';
};

const missionCompleted = props => {
	const {index, points}=props;
	axios
		.patch(`/todos/${index}`)
		.then(axios.patch(`/buckets/${points}`))
		.catch((err) => {
			console.log(err);
		});
		window.location.href = '/bucket';
};

const editMission = props => {
	debugger
	// this.setState({
	// 	isEdit: !isEdit,
	// });
};



const ShowMission = (items) => {
	return items.map((item, index) => (
		<div id="missions-for-saving" className="col-sm-6 collapse in" key={index}>
			<div className={`panel panel-primary ${item.isActive ?'':'disabled'} ${item.status !== 'done' ?'':'disabled'}`}>
				<div className={`panel-heading ${item.gender} ${index} `}>
					<button
					className="btn btn-info completed"
					type="button"
					onClick={() => missionCompleted({'index':item._id,'points':item.points})}>
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
						{/*<form method="post">
							<textarea name="description" value={item.description} />
							<input name="points" value={item.points} size='2' />
							<input type="hidden" name="createdBy" value={item.createdBy} />
							<input type="hidden" name="gender" value={item.gender} />
							<input type="hidden" name="type" value={item.type} />
							<input type="hidden" name="status" value={item.status} />
							<button type="submit">Submit</button>
						</form>*/}
					</div>
			</div>
		</div>
	))
}

const List = (props) => {
	let {missions, assignTo, type, transferPoints, isEdit} = props;
	const view = isEdit ? 'edit' : 'display';
	const filteredElements = typeof (assignTo) === 'undefined' ? missions : missions
		.filter((item, index) => item.assignTo.includes(assignTo) && item.isActive && item.type.includes(type))
	return (
		<div className={`container ${view}`}>
			 {ShowMission(filteredElements)}
		</div>
	)
}

export default List;
