import React from 'react';
import Player from '../Player/Player';
import Pager from '../Pager/Pager';

class Players extends React.Component {
  state = { cardCount: 1 };

  // componentDidMount() {
  // const { match } = this.props;
  // const { id } = match.params;
  // const request = new XMLHttpRequest();
  // const url = `https://api.football-data.org/v2/teams/${id}`;
  // request.onreadystatechange = () => {
  //   let data = {};
  //   if (request.readyState === 4 && request.status === 200) {
  //     const response = request.responseText;
  //     data = JSON.parse(response);
  //     console.log(data);
  //     this.setState({
  //       teamData: data
  //     });
  //   }
  // };
  // request.open('GET', url);
  // request.setRequestHeader(
  //   'X-Auth-Token',
  //   '5c2a8c8a545448b0b0973ef8fb86f209'
  // );
  // request.send();
  // }
  getCardCount = event => {
    const { cardCount } = this.state;
    this.setState({ cardCount: event.target.value });
    console.log(cardCount);
  };

  updateCardCount = number => {
    this.setState({
      cardCount: number
    });
  };

  changeCardCount = number => {
    const { cardCount } = this.state;
    this.setState({
      cardCount: cardCount + number
    });
  };

  render() {
    const { team } = this.props;
    const { cardCount } = this.state;
    const start = (cardCount - 1) * 5;
    const end = start + 5;
    return (
      <div>
        <Pager
          getCard={this.getCardCount}
          count={team.length}
          changeCard={this.changeCardCount}
          updateCard={this.updateCardCount}
          team={cardCount}
        />
        {team.slice(start, end).map(item => (
          <Player player={item} />
        ))}
      </div>
    );
  }
}

export default Players;
