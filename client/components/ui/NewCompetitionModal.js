import React from 'react'
import Dropzone from 'react-dropzone'

class NewCompetitionModal extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  /**
   * bind event. reset modal state after closing modal
   */
  componentDidMount() {
    $('#newCompetitionModal').on('hidden.bs.modal', () => {
      this.setState({})
    })
  }

  uploadFile = () => {
    setTimeout(() => {
      alert('上傳成功')
      $('#newCompetitionModal').modal('hide')
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

  render() {
    const { dropzoneClass, description } = this.state
    return (
      <div className="modal fade" id="newCompetitionModal">
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

export default NewCompetitionModal
