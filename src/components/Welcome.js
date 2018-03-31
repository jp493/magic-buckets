import React, { Component } from 'react';

class WelcomePage extends Component {
	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading"> <b>What is it all about?</b></div>
				<div className="panel-body">
					"Magic Buckets" - A Simple Budgeting System that helps children grow up to be finacially responsible.
				</div>
				<div className="panel-heading"> <b>Provide a list of features that something useful</b></div>
				<div className="panel-body">
				<ul>
				<li>Registration</li>
				<li>Login</li>
				<li>Show a list of the missisons for children to work on
					<ol>- Parent is able to add/edit/delete the missions</ol>
					<ol>- Children marks each mission status: 'To do', 'In progress' or 'Done'</ol>
				</li>
				<li>Show three buckets labelled Savings, Giving and Spending for each child</li>
				<li>Transfer points from Savings bucket to the other buckets</li>
				<ol>- Everyone gets 50 points as initial points for 'Saving'. When one mission in 'Saving' bucket gets completed, the points will be added to the total points</ol>
				<ol>- When children completed the mission in 'Giving' bucket, parent will also donate 50% of the points, to encourage charity activies</ol>
				<ol>- Children can add his/her wishlist to the 'Spending' bucket, and transfer available points from 'Saving' bucket, in order to 'pay' his/her spending missions</ol>
				<li>Buckets can be reset after the points to be claimed</li>
				</ul>
				</div>
			</div>
		)
	}
}
export default WelcomePage;
