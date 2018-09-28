import React from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import renderHTML from 'react-render-html'
import Dropzone from 'react-dropzone'
import Datetime from 'react-datetime'
import moment from 'moment'

import { CheckListModal } from '.'

import FileHandler from '../../utils/FileHandler'
import EditorHandler from '../../utils/EditorHandler'

import 'react-datetime/css/react-datetime.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class CreateCompetition extends React.Component {
  constructor(props) {
    console.log('constructor')
    super(props)
    this.dateFormat = 'YYYY-MM-DD HH:mm'
    this.checkList = [
      'Fill out the <strong>&nbsp;Competition Title</strong>.',
      'Fill out the <strong>&nbsp;Description</strong>.',
      'Fill out the <strong>&nbsp;Data Description</strong>.',
      'Upload at lease one <strong>&nbsp;Data Source</strong>.',
      'Upload <strong>&nbsp;One Solution</strong>.'
      // 'Select a valid <strong>&nbsp;Launch Date</strong>',
      // 'Select a valid <strong>&nbsp;Close Date</strong>'
    ]
    this.state = {
      descriptionEditorState: EditorState.createEmpty(),
      dataEditorState: EditorState.createEmpty(),
      dataSourceFiles: [],
      solutionDescription: '',
      solutionDropzoneClass: '',
      solutionFiles: [],
      launchDate: moment().format(this.dateFormat),
      closeDate: moment()
        .add(1, 'day')
        .format(this.dateFormat),
      isCheckeds: new Array(this.checkList.length).fill(false),
      openLaunchDatePicker: false,
      openCloseDatePicker: false
    }
  }

  componentDidMount() {
    console.log('CreateCompetition componentDidMount')
    let { launchDate, closeDate } = this.state
    launchDate = moment()
      .hour(0)
      .minute(0)
      .format(this.dateFormat)
    closeDate = moment()
      .add(1, 'day')
      .hour(0)
      .minute(0)
      .format(this.dateFormat)
    this.setState({ launchDate, closeDate })
  }

  onDescriptionEditorStateChange = descriptionEditorState => {
    let { isCheckeds } = this.state
    isCheckeds[1] =
      EditorHandler.getRawText(descriptionEditorState).trim() !== ''
    this.setState({ descriptionEditorState, isCheckeds })
  }

  onDataEditorStateChange = dataEditorState => {
    let { isCheckeds } = this.state
    isCheckeds[2] = EditorHandler.getRawText(dataEditorState).trim() !== ''
    this.setState({ dataEditorState, isCheckeds })
  }

  /**
   * onDrop callback, also triggered by selecting file using click
   */
  onDropDataSources = files => {
    let { dataSourceFiles, isCheckeds } = this.state

    dataSourceFiles = FileHandler.appendDistinct([...dataSourceFiles], files)
    isCheckeds[3] = dataSourceFiles.length > 0
    this.setState({ dataSourceFiles, isCheckeds })
  }

  /**
   * onDrop callback, also triggered by selecting file using click
   */
  onDropSolution = files => {
    console.log(files)
    // only accept CSV format
    if (FileHandler.getFileExtension(files[0].name) !== 'csv') {
      return
    }
    let { isCheckeds } = this.state
    isCheckeds[4] = files.length > 0
    this.setState({ solutionFiles: files, isCheckeds })
  }

  /**
   * render data sources or solution
   * @param {String} type "dataSource", "solution"
   * @param {List} files uploaded file list
   */
  renderFiles = (type, files) => {
    return (
      <ul className="list-group list-group-flush">
        {files.map((file, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-start align-items-center">
              <i
                className="fas fa-trash"
                onClick={() => this.removeFile(type, index)}
              />
              {file.name}
            </li>
          )
        })}
      </ul>
    )
  }

  /**
   * remove file from dataSourceFiles or solutionFiles depends on type
   * @param {String} type "dataSource", "solution"
   * @param {Ingeter} indexToRemove file index to remove
   */
  removeFile = (type, indexToRemove) => {
    let { dataSourceFiles, solutionFiles, isCheckeds } = this.state
    if (type === 'dataSource') {
      dataSourceFiles.splice(indexToRemove, 1)
      isCheckeds[3] = dataSourceFiles.length > 0
    } else if (type === 'solution') {
      solutionFiles.splice(indexToRemove, 1)
      isCheckeds[4] = solutionFiles.length > 0
    }
    this.setState({ dataSourceFiles, solutionFiles, isCheckeds })
  }

  /**
   * when description title changed, update the check list
   * @param {Event} e
   */
  onTitleChange = e => {
    let { isCheckeds } = this.state
    isCheckeds[0] = e.target.value.trim() !== ''
    this.setState({ isCheckeds })
  }

  /**
   * when launch date changed, validate launch date and update the check list
   * @param {Event} date
   */
  onLaunchDateChange = date => {
    let closeDate = moment(this.state.closeDate)

    if (closeDate <= date) {
      closeDate = moment(date).add(1, 'day')
    }

    this.setState({
      launchDate: date.format(this.dateFormat),
      closeDate: closeDate.format(this.dateFormat)
    })
  }

  /**
   * when launch date changed, validate close date and update the check list
   * @param {Event} date
   */
  onCloseDateChange = date => {
    this.setState({ closeDate: date.format(this.dateFormat) })
  }

  /**
   * return true, if the competition is ready to launch. Otherwise, return false
   */
  isReadyToLaunch = () => {
    return this.state.isCheckeds.reduce(
      (isReady, isChecked) => isReady && isChecked,
      true
    )
  }

  /**
   * launch the competition
   */
  launch = () => {
    let {
      descriptionEditorState,
      dataEditorState,
      dataSourceFiles,
      solutionFiles
    } = this.state
    let title = this.refs.title.value.trim()
    let description = EditorHandler.getHTML(descriptionEditorState)
    let dataDescription = EditorHandler.getHTML(dataEditorState)

    let params = new DataForm()
    dataSourceFiles.forEach(file =>
      params.append('file', file, `${title}/data sources`)
    )
    solutionFiles.forEach(file =>
      params.append('file', file, `${title}/solution`)
    )
  }

  render() {
    const {
      descriptionEditorState,
      dataEditorState,
      dataSourceFiles,
      solutionFiles,
      isCheckeds,
      launchDate,
      closeDate,
      openLaunchDatePicker,
      openCloseDatePicker
    } = this.state
    const launchBtnClass = this.isReadyToLaunch()
      ? 'btn-success'
      : 'btn-outline-success'
    return (
      <div
        id="create-competition"
        role="main"
        className="content-wrapper col pt-3 px-4">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">
                <input
                  type="text"
                  ref="title"
                  className="title"
                  placeholder="Competition Title"
                  onChange={this.onTitleChange}
                />
              </h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                  <button
                    disabled={!this.isReadyToLaunch()}
                    className={`btn btn-md ${launchBtnClass}`}
                    onClick={() => this.launch()}>
                    Launch
                  </button>
                  <button
                    className="btn btn-md btn-info"
                    data-toggle="modal"
                    data-target="#checkListModal">
                    Check
                  </button>
                  <button className="btn btn-md btn-warning">Preview</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="create-description" className="row">
          <div className="col py-2 my-2">
            <h4>Description</h4>
            <Editor
              editorState={descriptionEditorState}
              wrapperClassName="editor-wrapper"
              editorClassName="editor"
              onEditorStateChange={this.onDescriptionEditorStateChange}
            />
          </div>
        </div>
        <div id="create-data-description" className="row">
          <div className="col py-2 my-2">
            <h4>Data Description</h4>
            <Editor
              editorState={dataEditorState}
              wrapperClassName="editor-wrapper"
              editorClassName="editor"
              onEditorStateChange={this.onDataEditorStateChange}
            />
          </div>
        </div>
        <div id="create-data-sources" className="row mb-2">
          <div className="col-md-6">
            <div className="card mb-4 shadow-sm">
              <div className="card-header">Data Sources</div>
              <div className="card-body d-flex flex-column align-items-start">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 fileList">
                      {this.renderFiles('dataSource', dataSourceFiles)}
                    </div>
                    <div className="col-md-6">
                      <div className="dropzone">
                        <Dropzone
                          activeClassName="success"
                          onDrop={this.onDropDataSources}
                          multiple={true}>
                          <i className="fas fa-upload fa-5x" />
                          <p className="filename">Upload Data Sources</p>
                        </Dropzone>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4 shadow-sm">
              <div className="card-header">Solution</div>
              <div className="card-body d-flex flex-column align-items-start">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 fileList">
                      {this.renderFiles('solution', solutionFiles)}
                    </div>
                    <div className="col-md-6">
                      <div className="dropzone">
                        <Dropzone
                          activeClassName="success"
                          onDrop={this.onDropSolution}
                          multiple={false}>
                          <i className="fas fa-upload fa-5x" />
                          <p className="filename">Upload Solution(.csv)</p>
                        </Dropzone>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="date" className="row mb-5">
          <div className="col-md-6">
            <h4>Launch Date</h4>
            <div
              className="input-group"
              onClick={() =>
                this.setState({
                  openLaunchDatePicker: !openLaunchDatePicker
                })
              }>
              <div className="input-group-prepend">
                <i className="far fa-calendar-alt input-group-text" />
              </div>
              <input className="form-control" value={launchDate} disabled />
            </div>
            <Datetime
              value={moment(launchDate)}
              open={openLaunchDatePicker}
              input={false}
              isValidDate={date => date.isAfter(moment().subtract(1, 'day'))}
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm"
              onChange={this.onLaunchDateChange}
            />
          </div>
          <div className="col-md-6">
            <h4>Close Date</h4>
            <div
              className="input-group"
              onClick={() =>
                this.setState({
                  openCloseDatePicker: !openCloseDatePicker
                })
              }>
              <div className="input-group-prepend">
                <i className="fas fa-calendar-alt input-group-text" />
              </div>
              <input className="form-control" value={closeDate} disabled />
            </div>
            <Datetime
              value={moment(closeDate)}
              open={openCloseDatePicker}
              input={false}
              isValidDate={date => date.isAfter(launchDate)}
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm"
              onChange={this.onCloseDateChange}
            />
            {/* <DatePicker
              className="form-control"
              selected={this.state.closeDate}
              dateFormat={DateHandler.dateFormat}
              onChange={this.onCloseDateChange}
            /> */}
          </div>
        </div>

        {/* <div id="_" className="row mb-2">
          <div className="col">
            <h4>Check List</h4>
            <div className="alert alert-info" role="alert">
              {this.renderCheckList()}
            </div>
          </div>
        </div> */}
        <CheckListModal isCheckeds={isCheckeds} checkList={this.checkList} />
      </div>
    )
  }
}

export default CreateCompetition
