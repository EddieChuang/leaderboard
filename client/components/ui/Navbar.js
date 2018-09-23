'use strict'
import React from 'react'
import auth from '../../utils/auth'

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  onSignout = e => {
    e.preventDefault()
    auth.signout(() => {
      window.location = '/signin'
    })
  }

  render() {
    return (
      <nav
        id="navbar"
        className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark p-0">
        <div className="container">
          <a href="/home" className="navbar-brand">
            Leaderboard System
          </a>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown mr-3">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown">
                  <i className="fas fa-user" /> {auth.getUser().username}
                </a>
                <div className="dropdown-menu">
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-user-circle" />
                    Profile
                  </a>
                  <a
                    href="#"
                    className="dropdown-item"
                    onClick={this.onSignout}>
                    <i className="fas fa-sign-out-alt" /> Sign out
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
