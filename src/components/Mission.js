import React, { Component } from 'react';
import AddMission from './AddMission';
import ShowMission from './ShowMission';
import axios from "axios";
import SkyLight from 'react-skylight';

class MissionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mission: '',
			assignTo: '',
			missions: []
		};
	};

	componentDidMount() {
		this.refresh();
	};

  _executeAfterModalClose(){
    window.location.href = '/bucket'
  }

  _executeOnOverlayClicked(){
    alert('Overlay clicked!');
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
			.then(this.refresh())//this.props.refresh
			.catch((err) => {
				console.log(err);
			});
    this.clearInput();
		this.dialogWithCallBacks.show();
		// window.location.href = '/bucket'
  };

	handleChange = e => {
    this.setState({
			[e.target.name]: e.target.value
    });
  };

	transferPoints = e => {
		console.log('hhhh');
	};

	render() {
		const { missions, assignTo, type } = this.props;

    return (
				<div className="container">
					<ShowMission
					 missions={missions}
					 assignTo={assignTo}
					 type={type}
					 transferPoints={this.transferPoints} />
					 <div className="col-md-10">
 						<AddMission
 							handleChange={this.handleChange}
 							addMission={this.addMission}
 							mission={this.state.mission}
 						/>
 					</div>
					<SkyLight
	          afterClose={this._executeAfterModalClose}
	          ref={ref => this.dialogWithCallBacks = ref}
	          title="Success">
	            You have added mission successfully!
	        </SkyLight>
				</div>
    );
  }
}

export default MissionList;
