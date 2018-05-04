import React, { Component } from 'react';

class NewAndOldBackers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBackers: 0,
      oldBackers: 0,
    };
  }

  componentDidUpdate() {
    const { backers } = this.props;
    let newBackers = 0;
    let oldBackers = 0;
    for (let i = 0; i < backers.length; i++) {
      if (backers[i].fundedProjects === 0) {
        newBackers++;
      } else {
        oldBackers++;
      }
    }
    if (this.state.newBackers !== newBackers || this.state.oldBackers !== oldBackers) {
      this.setState({
        newBackers,
        oldBackers,
      });
    }
  }

  render() {
    return (
      <div className="NewAndOldBackersContainer">
        <div className="NewAndOldBackersContent">
          <div className="newBackersContainer">
            <div className="subTitle">New Backers</div>
            <div className="backerCount">{`${this.state.newBackers.toLocaleString('en', { useGrouping: true })}`}</div>
            <div className="supText">backers had never backed a project on Kickstarter before</div>
          </div>
          <div className="oldBackersContainer">
            <div className="subTitle">Returning Backers</div>
            <div className="backerCount">{`${this.state.oldBackers.toLocaleString('en', { useGrouping: true })}`}</div>
            <div className="supText">backers had backed a project on Kickstarter before</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewAndOldBackers;
