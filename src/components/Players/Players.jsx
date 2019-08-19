import React from 'react';
import PropTypes from 'prop-types';
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
          render={item => <Player key={item.id} player={item} />}
        />
      </div>
    );
  }
}

Players.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired
};

export default Players;
