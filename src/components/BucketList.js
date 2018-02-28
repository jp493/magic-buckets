import React, { Component } from 'react';
import '../App.css';
import { getBucketsData } from '../utils/showbuckets-api';


class BucketList extends Component {
	constructor() {
		super()
		this.state = { buckets: [] };
	}

	getAllBuckets(params) {
		getBucketsData(params).then((buckets) => {
      this.setState({ buckets });
    });
	}

	componentDidMount() {
		this.getAllBuckets('buckets');
	}

  render() {
		const { buckets } = this.state;
    return (
			<div>
				<div className="container">
      		<h3 className="text-center">List All Buckets</h3>
					{ buckets.map((item, index) => (
							<div className="col-md-3" key={index}>
		            <div className={`square-service-block ${item.type}`}>
		               <a href="#">
		                 <div className="ssb-icon"><i className="fa fa-cubes" aria-hidden="true"></i></div>
		                 <h2 className= "ssb-title">{ item.type }</h2>
										 <div className="panel-body">
 	                    <p> { item.points }</p>
 	                    <p> { item.belongsTo }</p>
 	                  </div>
		               </a>
		            </div>
		          </div>
	          ))}
					</div>
			</div>
    );
  }
}

export default BucketList;
