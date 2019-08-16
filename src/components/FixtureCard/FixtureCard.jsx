import React from 'react';
import './FixtureCard.css';

const FixtureCard = props => {
  const { fixture, onClick } = props;
  const date = new Date(fixture.utcDate);

  return fixture.status === 'FINISHED' ? (
    <div
      onClick={() => onClick(fixture.id)}
      className="fixture__card"
      role="button"
    >
      <p className="card__title">{`${fixture.awayTeam.name} - ${fixture.homeTeam.name}  ${fixture.score.fullTime.awayTeam} - ${fixture.score.fullTime.homeTeam}`}</p>
      <p className="card__date">{date.toDateString()}</p>
    </div>
  ) : (
    <div
      className="fixture__card"
      role="button"
      onClick={() => onClick(fixture.id)}
    >
      <p className="card__title">{`${fixture.awayTeam.name} - ${fixture.homeTeam.name}`}</p>
      <p className="card__date">{date.toDateString()}</p>
    </div>
  );
};

export default FixtureCard;
