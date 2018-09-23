'use strict'
import React, { Fragment } from 'react'
import { Navbar, Sidebar, Competition, Dashboard, NewCompetition } from '../ui'
import { SubmitFileModal, NewCompetitionModal } from '../ui'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <Navbar />
        <section>
          <div className="container-fluid">
            <div className="row">
              <Sidebar />
              <Competition competitionId={}/>
            </div>
          </div>
        </section>
        <SubmitFileModal />
        <NewCompetitionModal />
      </Fragment>
    )
  }
}
export default Home
