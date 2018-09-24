'use strict'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  switchContent as switchContentAction,
  switchCompetition as switchCompetitionAction
} from '../../actions/contentActions'

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
            <li
              className="nav-item"
              onClick={() => this.props.switchContent('0')}>
              <a href="#" className="nav-link active">
                <i className="fas fa-home" />
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-target="#competitionList"
                data-toggle="collapse"
                aria-expanded="false">
                <i className="fab fa-ravelry" />
                Competitions
              </a>
              <ul className="collapse list-group" id="competitionList">
                <li
                  className="list-group-item active"
                  onClick={() => this.props.switchCompetition('0')}>
                  Text Classification
                </li>
                <li className="list-group-item">NER</li>
                <li className="list-group-item">Image Caption</li>
                <li
                  className="list-group-item text-center"
                  onClick={() => this.props.switchCompetition('-1')}
                  // data-toggle="modal"
                  // data-target="#newCompetitionModal"
                >
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
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      switchContent: switchContentAction,
      switchCompetition: switchCompetitionAction
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
