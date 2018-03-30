import React, { Component } from 'react';
import Mission from './Mission';
import { getToken } from "../services/tokenService";
import axios from "axios";
import SkyLight from 'react-skylight';
import '../App.css';

class BucketList extends Component {
	constructor(props) {
		super(props)
		this.state={
			buckets: [],
			showbox: true,
			showTransfer: false,
			mission: '',
			missions: [],
			assignTo: props.username
		};
	}

	toggleBox = ()  => {
    // check if box is currently opened
    const { showbox }=this.state;
    this.setState({
      showbox: !showbox,
    });
		this.refresh();
  }

	componentDidMount() {
		this.refresh();
	}

	refresh = () => {
		const token = getToken();
		axios.get("/buckets", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((res) => {
			if (res.data.payload) {
				this.setState({ buckets: res.data.payload });
			}
		});
		axios.get("/todos").then((res) => {
			if (res.data.payload) {
				this.setState({ missions: res.data.payload });
			}
		});
	};

	showTransferPoints = () => {
		const { showTransfer }=this.state;
    this.setState({
      showTransfer: !showTransfer,
    });
		if (!showTransfer) {
			this.dialogWithCallBacks.show();
		}
	};

  _executeAfterModalClose(){
		// console.log('close');
    // window.location.href = '/bucket/1'
  };

	handleSubmitTransfer = (e) => {
		var {transferTo, transferPoints} = this.state;
		var transferFrom = this.state.buckets[0].points - transferPoints; //TODO: make it by _id

		axios
			.patch(`/buckets/${transferFrom}`)
			.then(
				axios.patch(`/buckets/transfer/${transferTo}&${transferPoints}`),
				window.location.href = '/bucket/1')
			.catch((err) => {
				console.log(err);
			});
	};

	handleChange = (e) => {
		if ((e.refs.transferPoints.value !== '')||(e.refs.transferTo.value !=="")){
			this.setState({
				transferPoints:e.refs.transferPoints.value,
				transferTo:e.refs.transferTo.value
			})}
	};

  render() {
		const { buckets, showbox, assignTo, missions, showTransfer}=this.state;

    return (
			<div className="container">
					{ buckets
							.filter((item, index) => (item.belongsTo.includes(assignTo)))
							.map((item, index) => (
								<div className={`square-service-block ${item.type}`} key={index}>
									<div className="col-md-3">
										<div className="col-md-3 col-sm-6">
											<div className={item.points <50?`progress yellow`:'progress blue'}>
													<span className="progress-left">
															<span className="progress-bar"></span>
													</span>
													<span className="progress-right">
															<span className="progress-bar"></span>
													</span>
													<div className="progress-value">{ item.points }pt.</div>
											</div>
										</div>
									 <a href="#">
										 <div className="ssb-icon"><i className="fa fa-cubes" aria-hidden="true"></i></div>
										 <h2 className="ssb-title">{ item.type }</h2>
										 <div className="panel-body">
											<button type="button" className="btn btn-info" onClick={ this.toggleBox }><span className="glyphicon glyphicon-share"></span>Toggle List</button>
											<button type="button" className="btn btn-warning transfer" onClick={this.showTransferPoints }><span className="glyphicon glyphicon-share"></span>Transfer</button>
										</div>
									 </a>
									 {showbox && (
										<Mission
											 missions={missions}
											 assignTo={assignTo}
											 type={item.type}
											 showbox={showbox}
											 saving_points={item.points} />
									 )}
								</div>
							</div>
						))}
						<SkyLight
						 afterClose={this._executeAfterModalClose}
						 ref={ref => this.dialogWithCallBacks = ref}
						 title="Transfer">
							 You have total ??? points!
							 <div className="input-group">
			 					<select name='transferTo' ref="transferTo" className="form-control" onChange={() => this.handleChange(this)}>
			             <option value="">Transfer to...</option>
			             <option value="Giving">Giving bucket</option>
			             <option value="Spending">Spending bucket</option>
			           </select>
			 				</div>
							<br /><br /><br />
							<div className="cols-sm-6 form-group">
									<input name='transferPoints' ref="transferPoints"
										className="form-control"
										placeholder="How many points?"
										onChange={() => this.handleChange(this)}
									 />
							</div>
							<div className="form-group container">
								<button type="button" className="btn btn-info" onClick={() => this.handleSubmitTransfer(this) }>
								<span className="glyphicon glyphicon-add"></span>Transfer</button>
							</div>
					 </SkyLight>
				</div>
    );
  }
}

export default BucketList;
