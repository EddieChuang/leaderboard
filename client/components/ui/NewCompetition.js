import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { SubmitFileModal, NewCompetitionModal } from '.'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class NewCompetition extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div id="new-competition" role="main" className="col pt-3 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Text Classification</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
              <button className="btn btn-md btn-outline-success">Launch</button>
              <button className="btn btn-md btn-outline-secondary">
                History
              </button>
            </div>
          </div>
        </div>

        <div id="new-description" className="py-2">
          <h4>Description</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
            malesuada nunc. Aliquam erat volutpat. Maecenas sit amet leo
            sodales.
          </p>
        </div>

        <div id="new-data" className="py-2">
          <h4>Data</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
            malesuada nunc.
          </p>
        </div>
      </div>
    )
  }
}

export default NewCompetition
