'use strict'
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Navbar,
  Sidebar,
  Competition,
  Dashboard,
  CreateCompetition
} from '../ui'
import { SubmitFileModal } from '../ui'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  renderContent = () => {
    const { contentId, competitionId } = this.props
    let content = <div />
    if (contentId === '0') {
      content = <Dashboard />
    } else if (contentId === '1') {
      content =
        competitionId === '-1' ? (
          <CreateCompetition />
        ) : (
          <Competition competitionId={competitionId} />
        )
    }
    return content
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            {this.renderContent()}
            {/* <Competition competitionId={}/> */}
          </div>
        </div>
        <SubmitFileModal />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    contentId: state.content.contentId,
    competitionId: state.content.competitionId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
