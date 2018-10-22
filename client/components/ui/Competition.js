import React from 'react'
import renderHTML from 'react-render-html'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { SubmitFileModal } from '.'

import CompetitionHandler from '../../utils/CompetitionHandler'

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class Competition extends React.Component {
  constructor() {
    super()
    this.state = {
      competition: {
        title: '',
        description: '',
        dataDescription: '',
        dataSources: []
      }
    }
  }

  componentDidMount() {
    console.log('Competition componentDidMount')
    CompetitionHandler.get(this.props.competitionId, competition => {
      console.log()
      this.setState({ competition })
    })
  }

  componentWillReceiveProps(props) {
    console.log('Competition componentWillReceiveProps')
    CompetitionHandler.get(props.competitionId, competition => {
      this.setState({ competition })
    })
  }

  renderDataSources = () => {
    const dataSources = this.state.competition.dataSources
    return dataSources.map(data => {
      return (
        <p className="data-file">
          <i className="fas fa-file-alt" />
          <a href="#">{data}</a>
        </p>
      )
    })
  }

  renderLeaderboard = () => {
    var products = [
      {
        rank: 1,
        username: 'chiamin',
        score: 0.5678,
        last: '2 month'
      },
      {
        rank: 2,
        username: 'alznn',
        score: 0.4567,
        last: '3 week'
      },
      {
        rank: 3,
        username: 'calleigh',
        score: 0.3456,
        last: '1 day'
      },
      {
        rank: 4,
        username: 'anita',
        score: 0.2345,
        last: '7 hour'
      },
      {
        rank: 5,
        username: 'richard',
        score: 0.1234,
        last: '1 sec'
      }
    ]
    return (
      <BootstrapTable
        data={products}
        bordered={false}
        hover
        striped
        version="4"
      >
        <TableHeaderColumn isKey dataField="rank">
          Rank
        </TableHeaderColumn>
        <TableHeaderColumn dataField="username">Username</TableHeaderColumn>
        <TableHeaderColumn dataField="score">Score</TableHeaderColumn>
        <TableHeaderColumn dataField="last">Last</TableHeaderColumn>
      </BootstrapTable>
    )
  }

  render() {
    let { competition } = this.state
    console.log('Competition render')
    return (
      <div
        id="competition"
        role="main"
        className="content-wrapper col pt-3 px-4"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">{competition.title}</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
              <button
                className="btn btn-md btn-outline-secondary"
                data-toggle="modal"
                data-target="#submitFileModal"
              >
                Submit
              </button>
              <button className="btn btn-md btn-outline-secondary">
                History
              </button>
            </div>
          </div>
        </div>

        <div id="description" className="py-2">
          <h4>Description</h4>
          {renderHTML(competition.description)}
        </div>

        <div id="data" className="py-2">
          <h4>Data</h4>
          {renderHTML(competition.dataDescription)}
          {this.renderDataSources()}
        </div>

        <div id="leaderboard" className="py-2 pb-5">
          <h4>Leaderboard</h4>
          {this.renderLeaderboard()}
        </div>
        {/* <SubmitFileModal /> */}
        {/* <NewCompetitionModal /> */}
      </div>
    )
  }
}

export default Competition
