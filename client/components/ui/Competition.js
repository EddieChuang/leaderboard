import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { SubmitFileModal, NewCompetitionModal } from '.'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class Competition extends React.Component {
  componentDidMount() {}

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
        version="4">
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
    return (
      <div id="competition" role="main" className="col pt-3 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Text Classification</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
              <button
                className="btn btn-md btn-outline-secondary"
                data-toggle="modal"
                data-target="#submitFileModal">
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
            malesuada nunc. Aliquam erat volutpat. Maecenas sit amet leo
            sodales.
          </p>
        </div>

        <div id="data" className="py-2">
          <h4>Data</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
            malesuada nunc.
          </p>
          <p className="data-file">
            <i className="fas fa-file-alt" />
            train.xml
          </p>
          <p className="data-file">
            <i className="fas fa-file-alt" />
            test.xml
          </p>
          <p className="data-file">
            <i className="fas fa-file-alt" />
            sample.csv
          </p>
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
