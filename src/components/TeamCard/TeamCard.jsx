import React from 'react';
import PropTypes from 'prop-types';
import './TeamCard.css';

const TeamCard = props => {
  const { img, title, text } = props;
  return (
    <div className="card">
      <img
        alt="team-logo"
        src={img}
        width="100px"
        height="100px"
        className="card__img-top"
      />
      <div className="card__body">
        <p className="card__title">{title}</p>
        <p className="card__text">{text}</p>
      </div>
    </div>
  );
};
TeamCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default TeamCard;
