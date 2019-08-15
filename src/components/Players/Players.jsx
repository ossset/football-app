import React from 'react';
import Player from '../Player/Player';
import ListWithPager from '../ListWithPager/ListWithPager';

class Players extends React.Component {
  state = {};

  render() {
    const { data } = this.props;
    return (
      <div>
        <ListWithPager
          data={data}
          itemsOnPage={5}
          render={item => <Player player={item} />}
        />
      </div>
    );
  }
}

export default Players;
