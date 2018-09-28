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
  constructor(props) {
    console.log('Home constructor')
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  renderContent = () => {
    const { contentId, itemId } = this.props
    let content = <div />
    if (contentId === '0') {
      content = <Dashboard />
    } else if (contentId === '1') {
      content =
        itemId === '-1' ? (
          <CreateCompetition />
        ) : (
          <Competition competitionId={itemId} />
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
    itemId: state.content.itemId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
