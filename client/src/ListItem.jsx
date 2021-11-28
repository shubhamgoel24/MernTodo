import React from "react";
const ListItem = (props) => {
    const {_id,description,date,category} = props.item;
    return(
        <li className="row item" id={_id}>
            <input type="checkbox" className="col-1 listitem" id={ _id }></input>
            <div className="col-5">
                <div id="taskdisc" className="row">{description}</div>
                <div id="taskdate" className="row">{Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(Date.parse(date)))}</div>
            </div>
            <div className="col-6">
                <div className="row d-flex justify-content-end">{category}</div>
            </div>
        </li>
    );
}

export default ListItem;    