'use strict'
import React from 'react'
import { NewCompetitionModal } from '.'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <nav className="col-md-2 d-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <i className="fas fa-home" />
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#competitionList"
                data-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseExample">
                <i className="fab fa-ravelry" />
                Competitions
              </a>
              <ul className="collapse list-group" id="competitionList">
                <li className="list-group-item active">Text Classification</li>
                <li className="list-group-item">NER</li>
                <li className="list-group-item">Image Caption</li>
                <li
                  className="list-group-item text-center"
                  data-toggle="modal"
                  data-target="#newCompetitionModal">
                  <i className="fas fa-plus-circle" />
                </li>
              </ul>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a className="d-flex align-items-center text-muted" href="#" />
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Current month
              </a>
            </li>
          </ul>
        </div>
        {/* <NewCompetitionModal /> */}
      </nav>
    )
  }
}

export default Sidebar
