import React from 'react'

function Add(props) {
    return(
        <div className="form-group">
            <label>
                {props.disp}
            </label>
            <input type={props.type} className="form-control" id={props.name} maxLength="30">
            </input>
        </div>
    );
}

export default Add;