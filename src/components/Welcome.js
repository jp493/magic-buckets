import React, { Component } from 'react';

class WelcomePage extends Component {
	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading"> What is it all about?</div>
				<div className="panel-body">
					"Magic Buckets" - A Simple Budgeting System that helps children grow up to be finacially responsible.
				</div>
				<div className="panel-heading"> Provide a list of features that something useful</div>
				<div className="panel-body">
				<ul>
				<li>Registration</li>
				<li>Login</li>
				<li>Show a list of the missisons for children to work on
					<ol>Parent is able to add/edit/delete the missions</ol>
					<ol>Children marks each mission status: 'To do', 'In progress' or 'Done'</ol>
				</li>
				<li>Show three buckets labelled Savings, Giving and Spending for each child</li>
				<li>Transfer points from Savings bucket to the tother buckets</li>
				<li>Buckets can be reset after the points to be claimed</li>
				</ul>
				</div>
			</div>
		)
	}
}
export default WelcomePage;
