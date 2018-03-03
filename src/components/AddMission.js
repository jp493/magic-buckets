import React from "react";

const AddMission = props => {
  const { handleChange, addMission, mission, assignTo } = props;
  return (
    <div className="Add col-sm-10 form-horizontal">
			<div className="cols-sm-10 form-group">
				<div className="input-group">
					<textarea name='mission'
						className="form-control"
						placeholder='What is about?'
						onChange={handleChange}
						value={mission} />
				</div>
			</div>
			<div className="cols-sm-10 form-group">
				<div className="input-group">
					<select name='assignTo' className="form-control" value={assignTo} onChange={handleChange}>
            <option value=""> To Who?</option>
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
