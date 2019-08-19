import React from 'react';
import PropTypes from 'prop-types';
import Pager from '../Pager/Pager';

class ListWithPager extends React.Component {
  state = { pageNumber: 1 };

  setPageNumber = page => {
    this.setState({ pageNumber: page });
  };

  render() {
    const { pageNumber } = this.state;
    const { data, render, itemsOnPage } = this.props;
    const start = (pageNumber - 1) * itemsOnPage;
    const end = start + itemsOnPage;
    return (
      <div>
        <Pager
          data={data}
          page={pageNumber}
          itemsOnPage={itemsOnPage}
          setPageNumber={this.setPageNumber}
        />
        {data.slice(start, end).map(item => render(item))}
      </div>
    );
  }
}

ListWithPager.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  render: PropTypes.func.isRequired,
  itemsOnPage: PropTypes.number.isRequired
};

export default ListWithPager;
