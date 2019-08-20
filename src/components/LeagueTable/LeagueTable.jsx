import React, { Component } from 'react';
import './LeagueTable.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LeagueTabButton from '../LeagueTabButton/LeagueTabButton';

class LeagueTable extends Component {
  state = {
    leagueData: null
  };

  componentDidMount() {
    this.getCompetitionData();
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps;
    const { match } = this.props;
    if (match.params.id !== prevMatch.params.id) {
      this.getLeagueData(match.params.id);
    }
  }

  getCompetitionData = async () => {
    const { match, history } = this.props;
    const competitionID = match.params.id;
    const url = `https://api.football-data.org/v2/competitions/${competitionID}/standings`;
    if (match.params.id) {
      const apiUrl = await fetch(url, {
        headers: { 'X-Auth-Token': '5c2a8c8a545448b0b0973ef8fb86f209' },
        type: 'GET',
        dataType: 'json'
      });
      const data = await apiUrl.json();
      this.setState({
        leagueData: data
      });
    } else {
      history.replace('/table/PL');
    }
  };

  getLeagueData = async leagueID => {
    const url = `https://api.football-data.org/v2/competitions/${leagueID}/standings`;
    const apiUrl = await fetch(url, {
      headers: { 'X-Auth-Token': '5c2a8c8a545448b0b0973ef8fb86f209' },
      type: 'GET',
      dataType: 'json'
    });
    const data = await apiUrl.json();
    this.setState({
      leagueData: data
    });
  };

  render() {
    const { leagueData } = this.state;
    return (
      <div>
        <div className="tab">
          <Link to="/table/PL">
            <LeagueTabButton leagueName="English" />
          </Link>
          <Link to="/table/BL1">
            <LeagueTabButton leagueName="German" />
          </Link>
          <Link to="/table/PD">
            <LeagueTabButton leagueName="Spanish" />
          </Link>
          <Link to="/table/SA">
            <LeagueTabButton leagueName="Italian" />
          </Link>
          <Link to="/table/FL1">
            <LeagueTabButton leagueName="French" />
          </Link>
        </div>
        {leagueData && (
          <table className="">
            <tbody className="table">
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>G</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GS</th>
                <th>GC</th>
                <th>P</th>
              </tr>
              {leagueData.standings[0].table.map(item => (
                <tr key={item.team.id}>
                  <td>
                    <p>{item.position}</p>
                  </td>
                  <td>
                    <a href="https://google.com">{item.team.name}</a>
                  </td>
                  <td>
                    <p>{item.playedGames}</p>
                  </td>
                  <td>
                    <p>{item.won}</p>
                  </td>
                  <td>
                    <p>{item.draw}</p>
                  </td>
                  <td>
                    <p>{item.lost}</p>
                  </td>
                  <td>
                    <p>{item.goalsFor}</p>
                  </td>
                  <td>
                    <p>{item.goalsAgainst}</p>
                  </td>
                  <td>
                    <p>{item.points}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

LeagueTable.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func
  }).isRequired
};

export default LeagueTable;
