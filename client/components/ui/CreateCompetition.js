import React from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import renderHTML from 'react-render-html'
import Dropzone from 'react-dropzone'

import { CheckListModal } from '.'

import FileHandler from '../../utils/FileHandler'

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class CreateCompetition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      descriptionEditorState: EditorState.createEmpty(),
      dataEditorState: EditorState.createEmpty(),
      dataSourceFiles: [],
      solutionDescription: '',
      solutionDropzoneClass: '',
      solutionFiles: [],
      isCheckeds: [false, false, false, false, false]
    }
    this.checkList = [
      'Fill out the <strong>&nbsp;Competition Title</strong>.',
      'Fill out the <strong>&nbsp;Description</strong>.',
      'Fill out the <strong>&nbsp;Data Description</strong>.',
      'Upload at lease one <strong>&nbsp;Data Source</strong>.',
      'Upload <strong>&nbsp;One Solution</strong>.'
    ]
  }

  componentDidMount() {}

  /**
   * extract raw string text from editor
   * @param {EditorState} editorState The current editor state
   */
  getRawText = editorState => {
    return convertToRaw(editorState.getCurrentContent()).blocks[0].text
  }

  onDescriptionEditorStateChange = descriptionEditorState => {
    let { isCheckeds } = this.state
    isCheckeds[1] = this.getRawText(descriptionEditorState).trim() !== ''
    this.setState({ descriptionEditorState, isCheckeds })
  }

  onDataEditorStateChange = dataEditorState => {
    let { isCheckeds } = this.state
    isCheckeds[2] = this.getRawText(dataEditorState).trim() !== ''
    this.setState({ dataEditorState, isCheckeds })
  }

  /**
   * onDrop callback, also triggered by selecting file using click
   */
  onDropDataSources = files => {
    let { dataSourceFiles, isCheckeds } = this.state

    dataSourceFiles = FileHandler.appendDistinct([...dataSourceFiles], files)

    // for (let i = 0; i < files.length; i++) {
    //   // ignore file with dulipcate name
    //   let j
    //   for (j = 0; j < dataSourceFiles.length; ++j) {
    //     if (files[i].name === dataSourceFiles[j].name) {
    //       break
    //     }
    //   }
    //   // accept file
    //   if (j === dataSourceFiles.length) {
    //     dataSourceFiles.push(files[i])
    //   }
    // }

    isCheckeds[3] = dataSourceFiles.length > 0
    this.setState({ dataSourceFiles, isCheckeds })
  }

  /**
   * onDrop callback, also triggered by selecting file using click
   */
  onDropSolution = files => {
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

  // renderCheckList = () => {
  //   const { isCheckeds } = this.state

  //   return (
  //     <ul className="text-monospace p-0 m-0">
  //       {isCheckeds.map((isChecked, index) => {
  //         const liClass = isChecked ? 'text-success' : 'text-danger'
  //         const iClass = isChecked ? 'fa-check' : 'fa-times'
  //         return (
  //           <li
  //             key={index}
  //             className={`d-flex justify-content-start align-items-center ${liClass}`}>
  //             <i className={`fas ${iClass} align-items-center`} />
  //             {renderHTML(this.checkList[index])}
  //           </li>
  //         )
  //       })}
  //     </ul>
  //   )
  // }

  /**
   * when description title changed, update the check list
   * @param {Event} e
   */
  onTitleChange = e => {
    let { isCheckeds } = this.state
    isCheckeds[0] = e.target.value.trim() !== ''
    this.setState({ isCheckeds })
  }

  isReadyToLaunch = () =>
    this.state.isCheckeds.reduce(
      (isReady, isChecked) => isReady && isChecked,
      true
    )

  launch = () => {
    let {
      descriptionEditorState,
      dataEditorState,
      dataSourceFiles,
      solutionFiles
    } = this.state
    let title = this.refs.title.value
    let description = draftToHtml(
      convertToRaw(descriptionEditorState.getCurrentContent())
    )
    let dataDescription = draftToHtml(
      convertToRaw(dataEditorState.getCurrentContent())
    )
  }

  render() {
    const {
      descriptionEditorState,
      dataEditorState,
      dataSourceFiles,
      solutionFiles,
      isCheckeds
    } = this.state
    const launchBtnClass = this.isReadyToLaunch()
      ? 'btn-success'
      : 'btn-outline-success'
    return (
      <div
        id="create-competition"
        role="main"
        className="content-wrapper col pt-3 px-4">
        {/* <div id="_" className="row mb-2">
          <div className="col">
            <h4>Check List</h4>
            <div className="alert alert-info" role="alert">
              {this.renderCheckList()}
            </div>
          </div>
        </div> */}
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
        {/* <div id="_" className="row mb-2">
          <div className="col">
            <h4>Check List</h4>
            <div className="alert alert-info" role="alert">
              {this.renderCheckList()}
            </div>
          </div>
        </div> */}
        <CheckListModal isCheckeds={isCheckeds} />
      </div>
    )
  }
}

export default CreateCompetition
