import React from 'react';
import PropTypes from 'prop-types';
import ListWithPager from '../ListWithPager/ListWithPager';
import FixtureCard from '../FixtureCard/FixtureCard';
import './FixturePage.css';

class FixturePage extends React.Component {
  state = {
    // fixtureDetails: null
    fixtureData: null,
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

  getFixtureData = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const { dateFrom, dateTo } = this.state;
    const url = `https://api.football-data.org/v2/teams/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    const apiUrl = await fetch(url, {
      headers: { 'X-Auth-Token': '5c2a8c8a545448b0b0973ef8fb86f209' },
      type: 'GET',
      dataType: 'json'
    });
    const data = await apiUrl.json();
    this.setState({
      fixtureData: data
    });
  };

  getFilteredData = async e => {
    e.preventDefault();
    const { match } = this.props;
    const { id } = match.params;
    const { dateFrom, dateTo } = this.state;
    const url = `https://api.football-data.org/v2/teams/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    const apiUrl = await fetch(url, {
      headers: { 'X-Auth-Token': '5c2a8c8a545448b0b0973ef8fb86f209' },
      type: 'GET',
      dataType: 'json'
    });
    const data = await apiUrl.json();
    this.setState({
      fixtureData: data
    });
  };

  showDetails = async id => {
    let data = {};
    const url = `https://api.football-data.org/v2/matches/${id}`;
    const apiUrl = await fetch(url, {
      headers: { 'X-Auth-Token': '5c2a8c8a545448b0b0973ef8fb86f209' },
      type: 'GET',
      dataType: 'json'
    });
    data = await apiUrl.json();
    // this.setState({
    //   fixtureDetails: data
    // });
    this.props.setFixtureDetails(data);
  };

  render() {
    const { fixtureData } = this.state;
    const { fixtureDetails } = this.props;
    let date = {};
    if (fixtureDetails) {
      date = new Date(fixtureDetails.match.utcDate);
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
                  onClick={id => this.showDetails(id)}
                />
              )}
            />
          </div>
          {fixtureDetails && (
            <div className="fixture__card--details">
              <p>
                {`${fixtureDetails.match.homeTeam.name} - ${fixtureDetails.match.awayTeam.name} / ${fixtureDetails.match.score.fullTime.homeTeam} - ${fixtureDetails.match.score.fullTime.awayTeam}`}
              </p>
              <p>{date.toDateString()}</p>
              <p>{`${fixtureDetails.match.homeTeam.name} wins: ${fixtureDetails.head2head.homeTeam.wins} `}</p>
              <p>{`${fixtureDetails.match.awayTeam.name} wins: ${fixtureDetails.head2head.awayTeam.wins} `}</p>
              <p>{`Draws: ${fixtureDetails.head2head.homeTeam.draws}`}</p>
            </div>
          )}
        </div>
      )
    );
  }
}

FixturePage.propTypes = {
  fixtureDetails: PropTypes.shape({
    head2head: PropTypes.shape({
      homeTeam: PropTypes.shape({
        draws: PropTypes.string,
        wins: PropTypes.string
      }),
      awayTeam: PropTypes.shape({
        draws: PropTypes.string,
        wins: PropTypes.string
      })
    }),
    match: PropTypes.shape({
      utcDate: PropTypes.string,
      homeTeam: PropTypes.string,
      awayTeam: PropTypes.string,
      params: PropTypes.shape({
        id: PropTypes.string
      }),
      score: PropTypes.shape({
        fullTime: PropTypes.shape({
          homeTeam: PropTypes.string,
          awayTeam: PropTypes.string
        })
      })
    }).isRequired
  }).isRequired
};

export default FixturePage;
