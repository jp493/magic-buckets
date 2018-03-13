import React, { Component } from 'react';
import '../App.css';
// import { getBucketsData } from '../utils/showbuckets-api';
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

	getAllBuckets() {
		// getBucketsData(params).then((buckets) => {
    //   this.setState({ buckets });
    // });
		axios.get("/buckets").then((res) => {
			if (res.data.payload) {
				this.setState({ buckets: res.data.payload });
			}
		});
	}

	componentDidMount() {
		// this.getAllBuckets('buckets'); //TODO: change to using axios
		this.refresh();
	}

	refresh = () => {
		axios.get("/buckets").then((res) => {
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

  render() {
		const { buckets, showbox, mission, missions }=this.state;
    return (
			<div className="container">
					{ buckets
							.filter((item, index) => (item.belongsTo.includes('Henry')))
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
