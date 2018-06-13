import React from 'react';

const TotalBackers = props => (
  <div className="TotalBackersContainer">
    <div className="title">
      {`${props.totalBackers} people are supporting ${props.projectCreator}`}
    </div>
  </div>
);

export default TotalBackers;
