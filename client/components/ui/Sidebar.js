'use strict'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { switchContent as switchContentAction } from '../../actions/contentActions'
import { getAllCompetitions as getAllCompetitionsAction } from '../../actions/competitionAction'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = { activeItem: '' }
  }

  componentDidMount() {
    this.props.getAllCompetitions()
  }

  renderCompetition = () => {
    const { activeId, competitions } = this.props
    return competitions.map(competition => {
      const isActive = competition._id === activeId
      const className = 'list-group-item ' + (isActive ? 'active' : '')
      return (
        <li
          key={competition._id}
          className={className}
          onClick={() => this.props.switchContent('1', competition._id)}
        >
          {competition.title}
        </li>
      )
    })
  }

  render() {
    return (
      <nav className="col-md-2 d-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li
              className="nav-item"
              onClick={() => this.props.switchContent('0', '')}
            >
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
                aria-expanded="false"
              >
                <i className="fab fa-ravelry" />
                Competitions
              </a>
              <ul className="collapse list-group" id="competitionList">
                {this.renderCompetition()}
                <li
                  className="list-group-item text-center"
                  onClick={() => this.props.switchContent('1', '-1')}
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
  return {
    competitions: state.competition.competitions,
    activeId: state.competition.activeId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      switchContent: switchContentAction,
      getAllCompetitions: getAllCompetitionsAction
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
