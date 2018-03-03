import React, { Component } from 'react';
import '../App.css';
import { getBucketsData } from '../utils/showbuckets-api';
import Mission from './Mission';
import axios from "axios";


class BucketList extends Component {
	constructor() {
		super()
		this.state={
			buckets: [],
			showbox: false,
			mission: '',
			missions: [],
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

	getAllBuckets(params) {//TODO: remove
		getBucketsData(params).then((buckets) => {
      this.setState({ buckets });
    });
	}

	componentDidMount() {
		this.getAllBuckets('buckets'); //TODO: change to using axios
		this.refresh();
	}

	refresh = () => {
		axios.get("/todos").then((res) => {
			this.setState({ missions: res.data.items });
		});
	};

  render() {
		const { buckets, showbox, mission, missions }=this.state;
    return (
			<div className="container">
      		<h3 className="text-center">List All Buckets</h3>
					{ buckets.map((item, index) => (
		            <div className={`square-service-block ${item.type}`}>
									<div className="col-md-3" key={index}>
										<div className="col-md-3 col-sm-6">
											<div className={item.points <50?`progress yellow`:'progress blue'}>
													<span className="progress-left">
															<span className="progress-bar"></span>
													</span>
													<span className="progress-right">
															<span className="progress-bar"></span>
													</span>
													<div className="progress-value">{ item.points }%</div>
											</div>
										</div>
		               <a href="#">
		                 <div className="ssb-icon"><i className="fa fa-cubes" aria-hidden="true"></i></div>
										 <h2 className="ssb-title">{ item.type }</h2>
										 <div className="panel-body">
											<button type="button" className="btn btn-info" onClick={ this.toggleBox }><span className="glyphicon glyphicon-share"></span>View List</button>
 	                  </div>
		               </a>
									 {showbox && (item.type ==='Saving') && (
							 		 	<Mission
								 			 missions={this.state.missions}
											 assignTo='Henry'
											 type='Saving' />
							 		 )}
		            </div>
		          </div>
	          ))
					}

				</div>
    );
  }
}

export default BucketList;
