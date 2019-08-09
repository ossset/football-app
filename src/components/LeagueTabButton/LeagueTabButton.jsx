import React from 'react';
import PropTypes from 'prop-types';
import './LeagueTabButton.css';
import { Link } from 'react-router-dom';

const LeagueTabButton = ({ onClick, leagueName, pathTo }) => (
  <button className="btn tab__button" type="button" onClick={onClick}>
    {leagueName}
  </button>
);

LeagueTabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  leagueName: PropTypes.string.isRequired
  // pathTo: PropTypes.string.isRequired
};

export default LeagueTabButton;
