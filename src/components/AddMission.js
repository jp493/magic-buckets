import React from "react";

const AddMission = props => {
  const { handleChange, addMission, mission, assignTo, points, type} = props;
  return (
    <div className="col-md-10">
			<div className="cols-sm-6 form-group float-label-control">
					<label className="control-label">ENTER MISSION DESCRIPTION</label>
					<textarea name='mission'
						className="form-control"
						onChange={handleChange}
						value={mission} />
			</div>
			<div className="cols-sm-10 form-group">
				<div className="input-group input-sm">
					<input name='assignTo' className="form-control mrgn-bttm-md" value={assignTo} onChange={handleChange}
					placeholder="ASSIGN TO..."
					type='text'
					/>
				</div>
			</div>
			<br />
			<div className="cols-sm-10 form-group">
				<div className="input-group input-sm">
					<input name='points' 	className="form-control" value={points} 	onChange={handleChange}
					placeholder="ENTER POINTS HERE..."
					type='text'
					/>
				</div>
			</div>
			<br />
			<div className="cols-sm-10 form-group">
				<div className="input-group input-sm">
					<select name='type' className="form-control mrgn-bttm-md" value={type} onChange={handleChange}>
            <option value="">Which buckets?</option>
            <option value="Saving">Saving</option>
            <option value="Giving">Giving</option>
            <option value="Spending">Spending</option>
          </select>
				</div>
			</div>
			<br />
      <input type="hidden" name='isActive' value='true'  />
			<div className="form-group container">
				<button type="button" className="btn btn-info" onClick={ addMission }>
				<span className="glyphicon glyphicon-add"></span>Add</button>
			</div>
    </div>
  );
};

export default AddMission;
