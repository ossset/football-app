import React from 'react';

class Pager extends React.Component {
  componentDidMount() {
    const { page } = this.props;
    console.log(page);
  }

  createSelect = () => {
    const { itemsOnPage, data } = this.props;
    const select = [];
    for (let i = 0; i < Math.ceil(data.length / itemsOnPage); i += 1) {
      select.push(i + 1);
    }
    return select;
  };

  goToFirstPage = () => {
    const { setPageNumber, page } = this.props;
    console.log(page);
    setPageNumber(1);
  };

  goToLastPage = () => {
    const optionsValue = this.createSelect();
    const { setPageNumber, page } = this.props;
    setPageNumber(optionsValue.length);
    console.log(page);
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
    const { data, page, setPageNumber } = this.props;
    const optionsValue = this.createSelect();

    return (
      <div>
        <select onChange={this.selectPageNumber} value={page}>
          {optionsValue.map(item => (
            <option>{item}</option>
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

export default Pager;
