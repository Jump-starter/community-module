import React, { Component } from 'react';

class BackersCities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
    };
  }

  componentDidUpdate() {
    const backers = this.props.backers;
    const cities = {};
    const topCities = [];
    for (let i = 0; i < backers.length; i++) {
      if (cities[backers[i].city]) {
        cities[backers[i].city]++;
      } else {
        cities[backers[i].city] = 1;
      }
    }
    for (let j = 0; j < 10; j++) {
      const city = Object.keys(cities).reduce((a, b) => (cities[a] > cities[b] ? a : b));
      topCities.push({ name: city, backers: cities[city] });
      delete cities[city];
    }
    console.log(this.state.cities);
    console.log(topCities);
    if (this.state.cities.length !== topCities.length) {
      this.setState({
        cities: topCities,
      });
    }
  }


  render() {
    return (
      <div className="BackersCitiesContainer">
        <div className="title">Where Backers Come From</div>
        <div className="title titleWithBottomBorder">Top Cities</div>
        <div className="cityDetailsContainer">{
        this.state.cities.slice(0, 10).map(city => (
          <div className="cityInlineElement">
            <div className="leftSide">
              <a className="city" href={`https://en.wikipedia.org/wiki/${city.name}`}>{city.name}</a>
              <a className="country" href={`https://en.wikipedia.org/wiki/${city.country}`}>{city.country}</a>
            </div>
            <div className="rightSide">
              <div className="backerCount">{`${city.backers.toLocaleString('en', { useGrouping: true })} backers`}</div>
            </div>
          </div>
          ))
      }
        </div>
      </div>
    );
  }
}


export default BackersCities;
