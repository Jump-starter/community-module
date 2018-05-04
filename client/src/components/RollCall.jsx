import React, { Component } from 'react';

class RollCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextBacker: 0,
    };
    this.checkMoreBackers = this.checkMoreBackers.bind(this);
  }

  checkMoreBackers() {
    this.setState({
      nextBacker: (this.state.nextBacker + 8),
    });
  }


  render() {
    return (
      <div className="RollCallContainer">
        <div className="rollCallTitle">
          <div className="subTitle">Roll call!</div>
          <div className="title">Here are a few of the people supporting {this.props.projectTitle}</div>
        </div>
        <div className="backersGridContainer">{
          this.props.backers.slice(this.state.nextBacker, (this.state.nextBacker + 8)).map((backer, index) => (
            <div className="backerContainer" key={`Backer${index + this.state.nextBacker}`}>
              <div className="backerSubContainer">
                <div className="backerAvatar"><img src={backer.avatar} alt="user avatar" /></div>
                <div className="backerName">{backer.name.length > 15 ? (`${backer.name.slice(0, 12)}...`) : backer.name}</div>
                <div className="backerProjectsBacked">Backed {backer.fundedProjects} {backer.fundedProjects === 1 ? 'project' : 'projects'}</div>
              </div>
            </div>
          ))
        }
          <button id="seeMoreBackers" onClick={this.checkMoreBackers}>See more!</button>
        </div>
      </div>
    );
  }
}

export default RollCall;
