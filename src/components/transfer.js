import React, { Component } from 'react';
import axios from "axios";

class Transfer extends Component {
	constructor(props) {
    super(props);
    this.state = {transferPoints: '', transferTo: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

	// handleSubmitTransfer = (e) => {
	// 	e.preventDefault();
	// 	let { transferPoints, transferTo } = this.state;
	// 	console.log(transferPoints,transferTo);
	// 	debugger
	// 	axios
	// 		.patch(`/buckets/transfer/${transferTo}&${transferPoints}`)
	// 		.then(window.location.href = '/bucket/1')
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	//
	// handleChange = (e) => {console.log(e.target.value)
	// 	if (e.target.value !== '') {
	// 		this.setState({
	// 			[e.target.name]:e.target.value
	// 		})
	// 	}
	// };

	render() {
			const {
				points
			} = this.props;

	    return (
				<div className="col-sm-6 collapse in">
					 You have total <b>{points}</b>!
					 <div className="input-group">
						<select name='transferTo' className="form-control">
							 <option value="">Transfer to...</option>
							 <option value="Giving">Giving bucket</option>
							 <option value="Spending">Spending bucket</option>
						 </select>
					</div>
					<br /><br /><br />
					<div className="cols-sm-6 form-group">
							<input name='transferPoints'
								className="form-control"
								placeholder="How many points?"
							 />
					</div>
					<div className="form-group container">
						<button type="button" className="btn btn-info" onClick={ this.handleSubmitTransfer }>
						<span className="glyphicon glyphicon-add"></span>Transfer</button>
					</div>
				</div>
	    );
	}
}

export default Transfer;
