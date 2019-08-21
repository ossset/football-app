import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from '../Nav/Nav';
import LeagueTable from '../LeagueTable/LeagueTable';
import Team from '../Team/Team';
import TeamPage from '../TeamPage/TeamPage';

class App extends React.Component {
  state = {};

  render() {
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
