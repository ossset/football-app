import React from 'react';
import './team.css';
import { Link } from 'react-router-dom';
import TeamSelector from '../TeamSelector/TeamSelector';
import TeamCard from '../TeamCard/TeamCard';

class Team extends React.Component {
  state = {
    teamData: null,
    currentLeague: 'PL'
  };

  componentDidMount() {
    const { currentLeague } = this.state;
    this.getTeamData(currentLeague);
  }

  onChangeTeam = e => {
    e.preventDefault();
    this.setState({
      currentLeague: e.target.value
    });
    this.getTeamData(e.target.value);
  };

  // getTeamData = async league => {
  //   // e.preventDefault();
  //   const url = `https://api.football-data.org/v2/competitions/${league}/teams`;
  //   const apiUrl = await fetch(url, {
  //     headers: { 'X-Auth-Token': '5c2a8c8a545448b0b0973ef8fb86f209' },
  //     type: 'GET',
  //     dataType: 'json'
  //   });
  //   const data = await apiUrl.json();
  //   // const teams = data.teams.map(item => item.name);
  //   this.setState({
  //     teamData: data
  //   });
  // };
  //! xhr
  getTeamData = league => {
    const request = new XMLHttpRequest();
    const url = `https://api.football-data.org/v2/competitions/${league}/teams`;

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
  };

  //! xhr
  render() {
    const { teamData, currentLeague } = this.state;
    return (
      <div>
        <TeamSelector
          currentLeague={currentLeague}
          onChange={this.onChangeTeam}
        />
        <div className="team__container">
          {teamData &&
            teamData.teams.map(item => (
              <Link to={`/teams/${item.id}`}>
                <TeamCard
                  img={item.crestUrl}
                  title={item.name}
                  text={item.shortName}
                />
              </Link>
            ))}
        </div>
      </div>
    );
  }
}

export default Team;
