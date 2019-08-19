import React from 'react';
import PropTypes from 'prop-types';
import './LeagueTabButton.css';

const LeagueTabButton = ({ leagueName }) => (
  <button className="btn tab__button" type="button">
    {leagueName}
  </button>
);

LeagueTabButton.propTypes = {
  leagueName: PropTypes.string.isRequired
};

export default LeagueTabButton;
