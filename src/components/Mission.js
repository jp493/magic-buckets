import React, { Component } from 'react';
import '../App.css';
import { getBucketsData } from '../utils/showbuckets-api';


class MissionList extends Component {
	constructor() {
		super()
		this.state = { missions: [] };
	}

	getAllMissions(params) {
		getBucketsData(params).then((missions) => {
      this.setState({ missions });
    });
	}

	componentDidMount() {
		this.getAllMissions('todos');
	}

  render() {
		const { missions } = this.state;
		const { assignTo, type } = this.props;

		const filteredElements = typeof (assignTo) === 'undefined' ? missions : missions
      .filter((item, index) => item.assignTo.includes(assignTo) && item.isActive && item.type.includes(type))

    return (
				<div className="container">
						{filteredElements.map((item, index) => (
							<div id="missions-for-saving" class="collapse in" className="col-sm-6" key={index}>
								<div className={`panel panel-primary ${item.isActive?'':'disabled'}`}>
									<div className={`panel-heading ${item.gender}`}>
										<h3 className="panel-title"> <span className="btn">Mission #{ item.id } to {item.assignTo}</span></h3>
									</div>
									<div className="panel-body">
										<p> { item.description } ({ item.points } points)</p>
										<p><i>{item.isActive?`status: ${item.status}`:''}</i></p>
									</div>
								</div>
							</div>
						))}
				</div>
    );
  }
}

export default MissionList;
