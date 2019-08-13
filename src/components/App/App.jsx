import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import LeagueTable from '../LeagueTable/LeagueTable';
import Team from '../Team/Team';
import LeagueTabButton from '../LeagueTabButton/LeagueTabButton';
import TeamPage from '../TeamPage/TeamPage';

class App extends React.Component {
  // state = {
  //   table: false,
  //   team: false
  // };
  state = {};
  // openTable = () => {
  //   this.setState({
  //     table: true,
  //     team: false
  //   });
  // };

  // openTeam = () => {
  //   this.setState({
  //     table: false,
  //     team: true
  //   });
  // };

  render() {
    // const { table, team } = this.state;
    return (
      <Router>
        <div>
          <Nav openTable={this.openTable} openTeam={this.openTeam} />

          <Route path="/table/:id?" component={LeagueTable} />
          <Route path="/teams" exact component={Team} />
          <Route path="/teams/:name" component={TeamPage} />
        </div>
      </Router>
    );
  }
}

export default App;
