import React from 'react';
import './FixtureCard.css';
import PropTypes from 'prop-types';

const FixtureCard = props => {
  const { fixture, onClick } = props;
  const date = new Date(fixture.utcDate);

  return fixture.status === 'FINISHED' ? (
    <button
      key={fixture.id}
      type="button"
      onClick={() => onClick(fixture.id)}
      className="fixture__card"
    >
      <p className="card__title">{`${fixture.awayTeam.name} - ${fixture.homeTeam.name}  ${fixture.score.fullTime.awayTeam} - ${fixture.score.fullTime.homeTeam}`}</p>
      <p className="card__date">{date.toDateString()}</p>
    </button>
  ) : (
    <button
      key={fixture.id}
      className="fixture__card"
      type="button"
      onClick={() => onClick(fixture.id)}
    >
      <p className="card__title">{`${fixture.awayTeam.name} - ${fixture.homeTeam.name}`}</p>
      <p className="card__date">{date.toDateString()}</p>
    </button>
  );
};

FixtureCard.propTypes = {
  fixture: PropTypes.shape({
    awayTeam: PropTypes.shape({
      name: PropTypes.string
    }),
    homeTeam: PropTypes.shape({
      name: PropTypes.string
    }),
    score: PropTypes.shape({
      fullTime: PropTypes.shape({
        awayTeam: PropTypes.number,
        homeTeam: PropTypes.number
      })
    }),
    utcDate: PropTypes.string,
    id: PropTypes.number,
    status: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default FixtureCard;
