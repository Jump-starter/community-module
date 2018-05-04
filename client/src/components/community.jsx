import React, { Component } from 'react';
import axios from 'axios';
import TotalBackers from './TotalBackers.jsx';
import BackersCities from './BackersCities.jsx';
import BackersCountries from './BackersCountries.jsx';
import NewAndOldBackers from './NewAndOldBackers.jsx';
import RollCall from './RollCall.jsx';


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
    const context = this;
    // axios.get(`http://54.191.230.153:80/api/community/${this.props.projectId || 0}`)
    axios.get(`http://localhost:3006/api/community/${this.props.projectId || 0}`)
      .then((response) => {
        context.setState({
          title: response.data[0].title,
          creator: response.data[0].creator,
          backers: response.data[1],
        });
      })
      .catch((error) => {
        console.log('There was an error fetching this project:', error);
      });
  }


  render() {
    return (
      <div className="communityModuleContainer">
        <TotalBackers totalBackers={this.state.backers.length} projectCreator={this.state.creator} />
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
