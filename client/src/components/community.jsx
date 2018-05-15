import React, { Component } from 'react';
import axios from 'axios';
import TotalBackers from './TotalBackers';
import BackersCities from './BackersCities';
import BackersCountries from './BackersCountries';
import NewAndOldBackers from './NewAndOldBackers';
import RollCall from './RollCall';

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      creator: '',
      backers: [],
    };
  }

  componentDidMount() {
    let projectId = this.props.projectId || 0;
    // axios.get(`http://localhost:3006/api/community/${projectId}`)
    axios.get(`http://ec2-54-215-140-14.us-west-1.compute.amazonaws.com/api/community/${projectId}`)
      .then((response) => {
        if (response.data) {
          this.setState({
            title: response.data.title,
            creator: response.data.creator,
            backers: response.data.backers,
          });
        }
      })
      .catch((error) => {
        console.log('There was an error fetching this project:', error);
      });
  }

  render() {
    return (
      <div className="communityModuleContainer">{/* eslint-disable
      */}<TotalBackers totalBackers={this.state.backers.length} projectCreator={this.state.creator} />
        <div className="communityLocationDataContainer">
          <BackersCities backers={this.state.backers} />
          <BackersCountries backers={this.state.backers} />
        </div>
        <NewAndOldBackers backers={this.state.backers} />
        <RollCall backers={this.state.backers} projectTitle={this.state.title} />
      </div>
    );
  }
}

export default Community;
