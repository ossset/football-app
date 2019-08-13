import React from 'react';

class Pager extends React.Component {
  state = {};

  createSelect = count => {
    const select = [];
    for (let i = 0; i < Math.ceil(count / 5); i++) {
      select.push(i + 1);
    }
    return select;
  };

  render() {
    const { updateCard, count, getCard, team, changeCard } = this.props;
    const select = this.createSelect(count);
    return (
      <div>
        <select onChange={getCard} value={team}>
          {select.map(item => (
            <option>{item}</option>
          ))}
        </select>
        <button type="button" onClick={() => updateCard(1)}>
          first
        </button>
        <button type="button" onClick={() => changeCard(team <= 1 ? 0 : -1)}>
          prev
        </button>
        <button
          type="button"
          onClick={() => changeCard(team >= select.length ? 0 : 1)}
        >
          next
        </button>
        <button type="button" onClick={() => updateCard(select.length)}>
          last
        </button>
      </div>
    );
  }
}

export default Pager;
