import React from 'react';
import PropTypes from 'prop-types';
import ListWithPager from '../ListWithPager/ListWithPager';
import FixtureCard from '../FixtureCard/FixtureCard';
import './FixturePage.css';

class FixturePage extends React.Component {
  state = {
    fixtureData: null,
    detailsItem: null,
    dateFrom: '',
    dateTo: ''
  };

  componentDidMount() {
    this.getFixtureData();
  }

  setDateFrom = e => {
    e.preventDefault();
    this.setState({
      dateFrom: e.target.value
    });
  };

  setDateTo = e => {
    e.preventDefault();
    this.setState({
      dateTo: e.target.value
    });
  };

  getFixtureData = () => {
    const { match } = this.props;
    const { id } = match.params;
    const { dateFrom, dateTo } = this.state;
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      let data = {};
      if (request.readyState === 4 && request.status === 200) {
        const response = request.responseText;
        data = JSON.parse(response);
        this.setState({
          fixtureData: data
        });
      }
    };
    request.open(
      'GET',
      `https://api.football-data.org/v2/teams/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`
    );
    request.setRequestHeader(
      'X-Auth-Token',
      '5c2a8c8a545448b0b0973ef8fb86f209'
    );
    request.send();
  };

  getFilteredData = e => {
    e.preventDefault();
    const { match } = this.props;
    const { id } = match.params;
    const { dateFrom, dateTo } = this.state;
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      let data = {};
      if (request.readyState === 4 && request.status === 200) {
        const response = request.responseText;
        data = JSON.parse(response);
        this.setState({
          fixtureData: data
        });
      }
    };
    request.open(
      'GET',
      `https://api.football-data.org/v2/teams/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`
    );
    request.setRequestHeader(
      'X-Auth-Token',
      '5c2a8c8a545448b0b0973ef8fb86f209'
    );
    request.send();
  };

  showDetais = id => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      let data = {};
      if (request.readyState === 4 && request.status === 200) {
        const response = request.responseText;
        data = JSON.parse(response);
        this.setState({
          detailsItem: data
        });
      }
    };
    request.open('GET', `https://api.football-data.org/v2/matches/${id}`);
    request.setRequestHeader(
      'X-Auth-Token',
      '5c2a8c8a545448b0b0973ef8fb86f209'
    );
    request.send();
  };

  render() {
    const { fixtureData, detailsItem } = this.state;
    let date = {};
    if (detailsItem) {
      date = new Date(detailsItem.match.utcDate);
    }
    return (
      fixtureData && (
        <div className="fixture__wrapper">
          <div className="fixture__container">
            <form
              className="fixture__form"
              onSubmit={e => this.getFilteredData(e)}
            >
              <input type="date" onChange={this.setDateFrom} />
              <input type="date" onChange={this.setDateTo} />
              <input type="submit" value="Filter" />
            </form>
            <ListWithPager
              data={fixtureData.matches}
              itemsOnPage={5}
              render={item => (
                <FixtureCard
                  key={item.id}
                  fixture={item}
                  onClick={id => this.showDetais(id)}
                />
              )}
            />
          </div>
          {detailsItem && (
            <div className="fixture__card--details">
              <p>
                {`${detailsItem.match.homeTeam.name} - ${detailsItem.match.awayTeam.name} / ${detailsItem.match.score.fullTime.homeTeam} - ${detailsItem.match.score.fullTime.awayTeam}`}
              </p>
              <p>{date.toDateString()}</p>
              <p>{`${detailsItem.match.homeTeam.name} wins: ${detailsItem.head2head.homeTeam.wins} `}</p>
              <p>{`${detailsItem.match.awayTeam.name} wins: ${detailsItem.head2head.awayTeam.wins} `}</p>
              <p>{`Draws: ${detailsItem.head2head.homeTeam.draws}`}</p>
            </div>
          )}
        </div>
      )
    );
  }
}

FixturePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default FixturePage;
