import React from 'react';
import PropTypes from 'prop-types';

class TeamSelector extends React.Component {
  state = {};

  render() {
    const { onChange, currentLeague } = this.props;
    return (
      <div className="selector__container">
        <select
          className="team__selector"
          value={currentLeague}
          onChange={onChange}
        >
          <option value="PL">English Premier League</option>
          <option value="BL1">German 1. Bundesliga</option>
          <option value="PD">Spanish Primera</option>
          <option value="SA">Italian Serie A</option>
          <option value="FL1">French League 1</option>
        </select>
      </div>
    );
  }
}

TeamSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentLeague: PropTypes.string.isRequired
};

export default TeamSelector;
