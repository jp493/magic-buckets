import React from "react";

const AddMission = props => {
  const { handleChange, addMission, mission, assignTo, points, type} = props;
  return (
    <div className="Add form-horizontal container">
			<div className="cols-sm-6 form-group float-label-control">
					<label className="control-label">What is the mission about?</label>
					<textarea name='mission'
						className="form-control"
						onChange={handleChange}
						value={mission} />
			</div>
			<div className="cols-sm-10 form-group label-floating">
				<div className="input-group">
					<select name='assignTo' className="form-control" value={assignTo} onChange={handleChange}>
            <option value=""> Assign to Who?</option>
            <option value="Henry">Henry</option>
            <option value="Faustine">Faustine</option>
          </select>
				</div>
			</div>
			<div className="cols-sm-10 form-group label-floating">
				<div className="input-group">
					<select name='points' className="form-control" value={points} onChange={handleChange}>
            <option value="">How many points?</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
				</div>
			</div>
			<div className="cols-sm-10 form-group label-floating">
				<div className="input-group">
					<select name='type' className="form-control" value={type} onChange={handleChange}>
            <option value="">Which buckets?</option>
            <option value="Saving">Saving</option>
            <option value="Giving">Giving</option>
            <option value="Spending">Spending</option>
          </select>
				</div>
			</div>
      <input type="hidden" name='isActive' value='true'  />
			<div className="form-group container">
				<button type="button" className="btn btn-info" onClick={ addMission }>
				<span className="glyphicon glyphicon-add"></span>Add</button>
			</div>
    </div>
  );
};

export default AddMission;
