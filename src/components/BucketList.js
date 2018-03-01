import React, { Component } from 'react';
import '../App.css';
import { getBucketsData } from '../utils/showbuckets-api';
import Mission from './Mission';


class BucketList extends Component {
	constructor() {
		super()
		this.state={
			buckets: [],
			showbox: false,
		};
		this.toggleBox=this.toggleBox.bind(this);
	}

	toggleBox() {
    // check if box is currently opened
    const { showbox }=this.state;
    this.setState({
      showbox: !showbox,
    });
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
		const { buckets, showbox }=this.state;
    return (
			<div className="container">
      		<h3 className="text-center">List All Buckets</h3>
					{ buckets.map((item, index) => (
							<div className="col-md-3" key={index}>
		            <div className={`square-service-block ${item.type}`}>
		               <a href="#">
		                 <div className="ssb-icon"><i className="fa fa-cubes" aria-hidden="true"></i></div>
		                 <h2 className="ssb-title">{ item.type }</h2>
										 <div className="panel-body">
 	                    <p> { item.points }</p>
											<button type="button" className="btn btn-info" onClick={ this.toggleBox }><span className="glyphicon glyphicon-share"></span>View List</button>
 	                  </div>
		               </a>
									 {showbox && (
          					<Mission assignTo={item.belongsTo} type={item.type}/>
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
