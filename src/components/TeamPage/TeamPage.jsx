import React from 'react';
import './TeamPage.css';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Players from '../Players/Players';
import FixturesPageContainer from '../FixturePage/container';

class TeamPage extends React.Component {
  state = {
    teamData: null
  };

  componentDidMount() {
    this.getTeamData();
  }

  getTeamData = async () => {
    const { match } = this.props;
    const { name } = match.params;
    const url = `https://api.football-data.org/v2/teams/${name}`;
    const apiUrl = await fetch(url, {
      headers: { 'X-Auth-Token': '5c2a8c8a545448b0b0973ef8fb86f209' },
      type: 'GET',
      dataType: 'json'
    });
    const data = await apiUrl.json();
    this.setState({
      teamData: data
    });
  };

  render() {
    const { match } = this.props;
    const { teamData } = this.state;
    return (
      teamData && (
        <div className="team__page">
          <div className="team__page-heading">
            <div className="team__image">
              <img
                src={teamData.crestUrl}
                alt="team logo"
                width="100px"
                height="100px"
              />
            </div>
            <div>
              <h3 className="team__title">{teamData.name}</h3>
              <p className="team__subtitle">{teamData.shortName}</p>
            </div>
          </div>
          <div className="team__buttons">
            <Link to={`/teams/${match.params.name}/players`}>
              <button type="button" className="btn">
                players
              </button>
            </Link>
            <Link to={`/teams/${match.params.name}/fixtures`}>
              <button type="button" className="btn">
                fixtures
              </button>
            </Link>
          </div>
          <div className="team__players">
            <Route
              path="/teams/:id/players"
              render={() => <Players data={teamData.squad} />}
            />
          </div>
          <div className="fixtures">
            <Route
              path="/teams/:id/fixtures"
              component={FixturesPageContainer}
            />
          </div>
        </div>
      )
    );
  }
}

TeamPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired
};

export default TeamPage;
