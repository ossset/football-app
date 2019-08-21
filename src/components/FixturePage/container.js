import { connect } from 'react-redux';
import setDetailsItem from '../App/actions';
import FixturePage from './FixturePage';

const mapStateToProps = state => {
  return {
    fixtureDetails: state.fixtureDetails.details
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFixtureDetails: details => dispatch(setDetailsItem(details))
  };
};

const FixturesPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FixturePage);

export default FixturesPageContainer;
