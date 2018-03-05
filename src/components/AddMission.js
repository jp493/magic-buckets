import React from "react";

const AddMission = props => {
  const { handleChange, addMission, mission, assignTo } = props;
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
      <input type="hidden" name='type' value='Saving'  />
      <input type="hidden" name='isActive' value='true'  />
			<div className="form-group container">
				<button type="button" className="btn btn-info" onClick={ addMission }>
				<span className="glyphicon glyphicon-add"></span>Add</button>
			</div>
    </div>
  );
};

export default AddMission;
