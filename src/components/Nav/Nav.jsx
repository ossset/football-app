import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './Nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
  state = {};

  render() {
    return (
      <nav className="nav__bar">
        <ul className="nav__list">
          <Link to="/">
            <li className="nav__title">Football Statistics</li>
          </Link>

          <li>
            <Link to="/table/PL">
              <button type="button" className="btn">
                table
              </button>
            </Link>
          </li>
          <li>
            <Link to="/teams">
              <button type="button" className="btn">
                teams
              </button>
            </Link>
          </li>
        </ul>

        <div className="login__wrapper">
          <button type="button" className="btn">
            Sign in
          </button>
          <p className="nav__text">or</p>
          <button type="button" className="btn">
            Sign up
          </button>
        </div>
      </nav>
    );
  }
}

export default Nav;
