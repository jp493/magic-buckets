import React from 'react';

const EditMission = ({handleChange, handleSubmit, missions, points, status, description, gender, type }) => (
		<form onSubmit={handleSubmit} method="post">
				<div className="panel panel-primary">
				{//this.state.missions.map((item, key) => (
						<div className="panel-body">
								{/*<h2>{bucket.type}</h2>
								<p>{bucket.isFull}</p>
								<p>{bucket.points}</p>
								<p>{bucket.belongsTo}</p>*/}
								<p>assign_to: {missions.assignTo}</p>
								<p>description: <br /><textarea name="description" placeholder={missions.description} onChange={handleChange} /></p>
								<p>gender: <input name="gender" value={missions.gender} placeholder={missions.gender} onChange={handleChange} /></p>
								<p>points: <input name="points" placeholder={missions.points} onChange={handleChange} /></p>
								{/*<p>created_by: <input name="createdBy" placeholder={missions.createdBy} onChange={handleChange} /></p>*/}
								<p>status: <input name="status" placeholder={missions.status} onChange={handleChange} /></p>
								<p>bucket_type:<input name="type" placeholder={missions.type} onChange={handleChange} /></p>
								<input type="hidden" value={missions._id} name="_id" />
						</div>
				//))
			}
				</div>
				<button type="submit">Submit</button>
		</form>
)

export default EditMission;
