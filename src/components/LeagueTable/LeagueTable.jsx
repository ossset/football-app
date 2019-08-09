import React, { Component } from 'react';
import './LeagueTable.css';
import { runInContext } from 'vm';
import LeagueTabButton from '../LeagueTabButton/LeagueTabButton';

class LeagueTable extends Component {
  state = {
    // leagueID: 'PL',
    leagueData: null
  };

  componentDidMount() {
    const { match } = this.props;
    // const { leagueData } = this.state;
    // console.log(match.params.id);
    // !XHR
    const request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      let data = {};
      if (request.readyState === 4 && request.status === 200) {
        const response = request.responseText;
        data = JSON.parse(response);
        this.setState({
          leagueData: data
        });
      }
    };
    request.open(
      'GET',
      `https://api.football-data.org/v2/competitions/${match.params.id}/standings`
    );
    request.setRequestHeader(
      'X-Auth-Token',
      '5c2a8c8a545448b0b0973ef8fb86f209'
    );
    request.send();
    //! XHR
    // const getData = async ID => {
    //   const url = `https://api.football-data.org/v2/competitions/${ID}/standings`;
    //   const apiUrl = await fetch(url, {
    //     headers: { 'X-Auth-Token': '5c2a8c8a545448b0b0973ef8fb86f209' },
    //     type: 'GET',
    //     dataType: 'json'
    //   });
    //   const data = await apiUrl.json();
    //   this.setState({
    //     leagueData: data
    //   });
    // };
    // getData(leagueID);
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps;
    const { match } = this.props;
    if (match.params.id !== prevMatch.params.id) {
      this.getLeagueData(match.params.id);
    }
    console.log('component did update');
  }

  // getLeagueData = leagueID => async e => {
  //   e.preventDefault();
  //   const url = `https://api.football-data.org/v2/competitions/${leagueID}/standings`;
  //   const apiUrl = await fetch(url, {
  //     headers: { 'X-Auth-Token': '5c2a8c8a545448b0b0973ef8fb86f209' },
  //     type: 'GET',
  //     dataType: 'json'
  //   });
  //   const data = await apiUrl.json();
  //   this.setState({
  //     leagueData: data
  //   });
  // };

  //! XHR
  getLeagueData = leagueID => {
    // e.preventDefault();
    const request = new XMLHttpRequest();
    const url = `https://api.football-data.org/v2/competitions/${leagueID}/standings`;

    request.onreadystatechange = () => {
      let data = {};
      if (request.readyState === 4 && request.status === 200) {
        const response = request.responseText;
        data = JSON.parse(response);
        this.setState({
          leagueData: data
        });
        console.log(`происходит setState в getLeagueData c ${leagueID}`);
      }
    };
    request.open('GET', url);
    request.setRequestHeader(
      'X-Auth-Token',
      '5c2a8c8a545448b0b0973ef8fb86f209'
    );
    request.send();
    console.log('вызывается метод getLeagueData');
  };
  //! XHR

  render() {
    const { leagueData } = this.state;
    return (
      <div>
        <div className="tab">
          <LeagueTabButton
            leagueName="English"
            onClick={this.getLeagueData('PL')}
          />
          <LeagueTabButton
            leagueName="German"
            onClick={this.getLeagueData('BL1')}
          />
          <LeagueTabButton
            leagueName="Spanish"
            onClick={this.getLeagueData('PD')}
          />
          <LeagueTabButton
            leagueName="Italian"
            onClick={this.getLeagueData('SA')}
          />
          <LeagueTabButton
            leagueName="French"
            onClick={this.getLeagueData('FL1')}
          />
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
                <tr>
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

export default LeagueTable;
