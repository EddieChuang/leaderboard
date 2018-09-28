import React from 'react'
import renderHTML from 'react-render-html'

class CheckListModal extends React.Component {
  constructor() {
    super()
    // this.checkList = [
    //   'Fill out the <strong>&nbsp;Competition Title</strong>.',
    //   'Fill out the <strong>&nbsp;Description</strong>.',
    //   'Fill out the <strong>&nbsp;Data Description</strong>.',
    //   'Upload at lease one <strong>&nbsp;Data Source</strong>.',
    //   'Upload <strong>&nbsp;One Solution</strong>.',
    //   'Select a valid <strong>&nbsp;launch date</strong>',
    //   'Select a valid <strong>&nbsp;close date</strong>'
    // ]
    this.state = { isCheckeds: [], checkList: [] }
  }

  /**
   * bind event. reset modal state after closing modal
   */
  componentDidMount() {
    $('#checkListModal').on('hidden.bs.modal', () => {})
    const { isCheckeds, checkList } = this.props
    this.setState({ isCheckeds, checkList })
  }

  componentWillReceiveProps(props) {
    const { isCheckeds, checkList } = props
    this.setState({ isCheckeds, checkList })
  }

  renderCheckList = () => {
    const { isCheckeds, checkList } = this.state

    return (
      <ul className="text-monospace p-0 m-0">
        {isCheckeds.map((isChecked, index) => {
          const liClass = isChecked ? 'text-success' : 'text-danger'
          const iClass = isChecked ? 'fa-check' : 'fa-times'
          return (
            <li
              key={index}
              className={`d-flex justify-content-start align-items-center ${liClass}`}>
              <i className={`fas ${iClass} align-items-center`} />
              {renderHTML(checkList[index])}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div className="modal fade" id="checkListModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-secondary text-white">
              <h5 className="modal-title">Check List</h5>
              <button className="close" data-dismiss="modal">
                <i className={`fas fa-times align-items-center`} />
              </button>
            </div>
            <div className="modal-body">
              <div className="alert alert-info" role="alert">
                {this.renderCheckList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CheckListModal
