import React from 'react';
import './TeamPage.css';
import { Route, Link } from 'react-router-dom';
import Players from '../Players/Players';

class TeamPage extends React.Component {
  state = {
    teamData: null
  };

  componentDidMount() {
    const { match } = this.props;
    const { name } = match.params;
    const request = new XMLHttpRequest();
    const url = `https://api.football-data.org/v2/teams/${name}`;

    request.onreadystatechange = () => {
      let data = {};
      if (request.readyState === 4 && request.status === 200) {
        const response = request.responseText;
        data = JSON.parse(response);
        this.setState({
          teamData: data
        });
      }
    };
    request.open('GET', url);
    request.setRequestHeader(
      'X-Auth-Token',
      '5c2a8c8a545448b0b0973ef8fb86f209'
    );
    request.send();
  }

  // getTeamData = name => {
  //   const request = new XMLHttpRequest();
  //   const url = `https://api.football-data.org/v2/teams/${name}`;

  //   request.onreadystatechange = () => {
  //     let data = {};
  //     if (request.readyState === 4 && request.status === 200) {
  //       const response = request.responseText;
  //       data = JSON.parse(response);
  //       this.setState({
  //         teamData: data
  //       });
  //     }
  //   };
  //   request.open('GET', url);
  //   request.setRequestHeader(
  //     'X-Auth-Token',
  //     '5c2a8c8a545448b0b0973ef8fb86f209'
  //   );
  //   request.send();
  // };

  render() {
    const { match } = this.props;
    const { teamData } = this.state;
    console.log(teamData);
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
              <button className="btn">players</button>
            </Link>
            <Link to={`/teams/${match.params.name}/fixtures`}>
              <button className="btn">fixtures</button>
            </Link>
          </div>
          <div className="team__players">
            <Route
              path="/teams/:id/players"
              render={() => <Players team={teamData.squad} />}
            />
          </div>
        </div>
      )
    );
  }
}

export default TeamPage;
