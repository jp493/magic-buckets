import React, { Component } from 'react';
import '../App.css';
import { getBucketsData } from '../utils/showbuckets-api';


class BucketList extends Component {
	constructor() {
		super()
		this.state = { buckets: [] };
	}

	getAllBuckets() {
		getBucketsData().then((buckets) => {
      this.setState({ buckets });
    });
	}

	componentDidMount() {
		this.getAllBuckets();
	}

  render() {
		const { buckets } = this.state;
    return (
			<div>
				<div className="container">
      		<h3 className="text-center">Bucket List</h3>
					{ buckets.map((item, index) => (
	              <div className="col-sm-6" key={index}>
	                <div className="panel panel-primary">
	                  <div className="panel-heading">
	                    <h3 className="panel-title"> <span className="btn">#{ item.id }</span></h3>
	                  </div>
	                  <div className="panel-body">
	                    <p> { item.description } </p>
	                  </div>
	                </div>
									<div className="col-sm-12">
					          <div className="jumbotron text-center">
					            <h2>Get Access to My Buckets By Logging In</h2>
					          </div>
					        </div>
	              </div>
	          ))}
					</div>
			</div>
    );
  }
}

export default BucketList;
