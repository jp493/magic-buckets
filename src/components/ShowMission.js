import React from 'react';
import axios from "axios";

const removeTodo = index => {
	axios
		.delete(`/todos/${index}`)
		.catch((err) => {
			console.log(err);
		});
};

const ShowMission = (items) => {
	return items.map((item, index) => (
		<div id="missions-for-saving" className="col-sm-6 collapse in" key={index}>
			<div className={`panel panel-primary ${item.isActive?'':'disabled'}`}>
				<div className={`panel-heading ${item.gender} ${index} `}>
					<h3 className="panel-title"> <span className="btn">Mission #{ item.id } to {item.assignTo}</span></h3>
					<button
					className="btn btn-warning"
					type="button"
					onClick={()=>removeTodo(index)}>
					<span className="glyphicon glyphicon-remove"></span></button>
				</div>
				<div className="panel-body">
					<p> { item.description } ({ item.points } points)</p>
					<p><i>{item.isActive?`status: ${item.status}`:''}</i></p>
				</div>
			</div>
		</div>
	))
}

const List = (props) => {
	let {missions, assignTo, type, removeTodo} = props;
	const filteredElements = typeof (assignTo) === 'undefined' ? missions : missions
		.filter((item, index) => item.assignTo.includes(assignTo) && item.isActive && item.type.includes(type))
	return (
		<div className="container">
			 {ShowMission(filteredElements)}
		</div>
	)
}

export default List;
