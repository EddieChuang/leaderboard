import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Dropzone from 'react-dropzone'

class SubmitFileModal extends React.Component {
  constructor() {
    super()
    this.state = {
      description: 'Upload Submission File',
      dropzoneClass: '',
      file: ''
    }
  }

  /**
   * bind event. reset modal state after closing modal
   */
  componentDidMount() {
    $('#submitFileModal').on('hidden.bs.modal', () => {
      this.setState({
        file: '',
        description: 'Upload Submission File',
        dropzoneClass: ''
      })
    })
  }

  /**
   * validate submission file is CSV format
   */
  validateFile = file => {
    if (file.name.substring(file.name.length - 4) === '.csv') {
      this.setState({ file, dropzoneClass: 'success', description: file.name })
    } else {
      this.setState({
        file: '',
        dropzoneClass: 'error',
        description: 'File should be CSV format'
      })
      setTimeout(() => {
        this.setState({
          dropzoneClass: '',
          description: 'Upload Submission File'
        })
      }, 3000)
    }
  }

  uploadFile = () => {
    setTimeout(() => {
      alert('上傳成功')
      $('#submitFileModal').modal('hide')
    }, 2000)
  }

  /**
   * onDrop callback, also triggered by selecting file using click
   */
  onDrop = files => {
    console.log(files)
    if (files.length === 0) {
      return
    }
    this.validateFile(files[0])
  }

  /**
   * render sumbit history, order by date ascending
   */
  renderSubmitHistory = () => {
    let products = [
      {
        index: 1,
        // username: 'chiamin',
        score: 0.5678,
        date: '2018-9-21'
      },
      {
        index: 2,
        // username: 'alznn',
        score: 0.4567,
        date: '2018-9-20'
      },
      {
        index: 3,
        // username: 'calleigh',
        score: 0.3456,
        date: '2018-9-19'
      },
      {
        index: 4,
        // username: 'anita',
        score: 0.2345,
        date: '2018-9-18'
      },
      {
        index: 5,
        // username: 'richard',
        score: 0.1234,
        date: '2018-9-17'
      },
      {
        index: 6,
        // username: 'anita',
        score: 0.0123,
        date: '2018-9-16'
      },
      {
        index: 7,
        // username: 'richard',
        score: 0.0012,
        date: '2018-9-15'
      }
    ]
    return (
      <BootstrapTable
        data={products}
        bordered={false}
        hover
        striped
        maxHeight="200px"
        version="4">
        <TableHeaderColumn isKey dataField="index" width="30px">
          #
        </TableHeaderColumn>
        {/* <TableHeaderColumn dataField="username">Username</TableHeaderColumn> */}
        <TableHeaderColumn dataField="score" width="80px">
          Score
        </TableHeaderColumn>
        <TableHeaderColumn dataField="date" width="70px">
          Date
        </TableHeaderColumn>
      </BootstrapTable>
    )
  }

  render() {
    const { dropzoneClass, description } = this.state
    return (
      <div className="modal fade" id="submitFileModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-secondary text-white">
              <h5 className="modal-title">Text Classification</h5>
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <div className="dropzone">
                    <Dropzone
                      className={dropzoneClass}
                      activeClassName="success"
                      onDrop={this.onDrop}
                      multiple={false}>
                      <i className="fas fa-upload fa-5x" />
                      <p className="filename" ref="file-name">
                        {description}
                      </p>
                    </Dropzone>
                  </div>
                  {/* <input
                    id="upload"
                    type="file"
                    accept=".csv"
                    className="file-upload"
                    onChange={e => this.selectFile(e)}
                  /> */}
                </div>
              </form>
              <div className="submitHistory">
                {/* <h4>Submit History</h4> */}
                {this.renderSubmitHistory()}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={this.uploadFile}>
                上傳
              </button>
              <button className="btn btn-danger" data-dismiss="modal">
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SubmitFileModal
