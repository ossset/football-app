import React from 'react';
import PropTypes from 'prop-types';

class Pager extends React.Component {
  createSelect = () => {
    const { itemsOnPage, data } = this.props;
    const select = [];
    for (let i = 0; i < Math.ceil(data.length / itemsOnPage); i += 1) {
      select.push(i + 1);
    }
    return select;
  };

  goToFirstPage = () => {
    const { setPageNumber } = this.props;
    setPageNumber(1);
  };

  goToLastPage = () => {
    const optionsValue = this.createSelect();
    const { setPageNumber } = this.props;
    setPageNumber(optionsValue.length);
  };

  goToNextPage = () => {
    const { page, setPageNumber } = this.props;
    const optionsValue = this.createSelect();
    return page >= optionsValue.length
      ? setPageNumber(page)
      : setPageNumber(page + 1);
  };

  goToPrevPage = () => {
    const { page, setPageNumber } = this.props;
    setPageNumber(page - 1);
    return page <= 1 ? setPageNumber(page) : setPageNumber(page - 1);
  };

  selectPageNumber = e => {
    const { setPageNumber } = this.props;
    setPageNumber(+e.target.value);
  };

  render() {
    const { page } = this.props;
    const optionsValue = this.createSelect();

    return (
      <div>
        <select onChange={this.selectPageNumber} value={page}>
          {optionsValue.map(item => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <button type="button" onClick={this.goToFirstPage}>
          first
        </button>
        <button type="button" onClick={this.goToPrevPage}>
          prev
        </button>
        <button type="button" onClick={this.goToNextPage}>
          next
        </button>
        <button type="button" onClick={this.goToLastPage}>
          last
        </button>
      </div>
    );
  }
}

Pager.propTypes = {
  setPageNumber: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  // data: PropTypes.shape({
  //   length: PropTypes.number
  // }).isRequired,
  itemsOnPage: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Array).isRequired
};

export default Pager;
