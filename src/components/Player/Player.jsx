import React from 'react';
import PropTypes from 'prop-types';
import './Player.css';

const Player = props => {
  const { player } = props;
  const date = new Date(player.dateOfBirth);
  return (
    <div className="player__card">
      <div>
        <h3 className="player__name">{player.name}</h3>
        <p className="player__position">
          {`position: ${player.position || 'не назначен'}`}
        </p>
        <p className="player__birth-date">{`date of birth: ${date.toDateString()}`}</p>
      </div>
      <div className="player__img">{player.shirtNumber}</div>
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.shape({
    dateOfBirth: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    shirtNumber: PropTypes.number
  }).isRequired
};

export default Player;
