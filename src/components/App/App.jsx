import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import LeagueTable from '../LeagueTable/LeagueTable';
import Team from '../Team/Team';
import LeagueTabButton from '../LeagueTabButton/LeagueTabButton';

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

          <Route
            path="/table"
            render={() => (
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
            )}
          />

          <Route path="/table/:id" component={LeagueTable} />
          <Route path="/teams" component={Team} />
        </div>
      </Router>
    );
  }
}

export default App;
