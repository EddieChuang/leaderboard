import React from 'react'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import renderHTML from 'react-render-html'
import Dropzone from 'react-dropzone'

class NewCompetition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      descriptionEditorState: EditorState.createEmpty(),
      dataEditorState: EditorState.createEmpty(),
      dataSourcesFile: [],
      solutionDescription: '',
      solutionDropzoneClass: '',
      solutionFile: []
    }
  }

  componentDidMount() {}

  onDescriptionEditorStateChange = descriptionEditorState => {
    this.setState({ descriptionEditorState })
  }

  onDataEditorStateChange = dataEditorState => {
    this.setState({ dataEditorState })
  }

  /**
   * onDrop callback, also triggered by selecting file using click
   */
  onDropDataSources = files => {
    console.log(files)
    let dataSourcesFile = this.state.dataSourcesFile
    for (let i = 0; i < files.length; i++) {
      let j
      for (j = 0; j < dataSourcesFile.length; ++j) {
        if (files[i].name === dataSourcesFile[j].name) {
          break
        }
      }
      if (j === dataSourcesFile.length) {
        dataSourcesFile.push(files[i])
      }
    }

    this.setState({ dataSourcesFile })
  }

  onDropSolution = files => {
    if (files.length === 0) {
      return
    }
    this.setState({ solutionFile: files[0] })
  }

  renderFileList = (type, fileList) => {
    return (
      <ul className="list-group list-group-flush">
        {fileList.map((file, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center">
              {file.name}
              <i
                className="fas fa-trash"
                onClick={() => this.removeFile(type, index)}
              />
            </li>
          )
        })}
      </ul>
    )
  }

  removeFile = (type, indexToRemove) => {
    let { dataSourcesFile, solutionFile } = this.state
    if (type === 'dataSources') {
      dataSourcesFile.splice(indexToRemove, 1)
    } else if (type === 'solution') {
      solutionFile.splice(indexToRemove, 1)
    }
    this.setState({ dataSourcesFile, solutionFile })
  }

  launch = () => {
    let {
      descriptionEditorState,
      dataEditorState,
      dataSourcesFile,
      solutionFile
    } = this.state
    let title = this.refs.title.value
    let description = draftToHtml(
      convertToRaw(descriptionEditorState.getCurrentContent())
    )
    let description = draftToHtml(
      convertToRaw(dataEditorState.getCurrentContent())
    )
  }

  render() {
    const {
      descriptionEditorState,
      dataEditorState,
      dataSourcesFile,
      solutionFile
    } = this.state
    return (
      <div
        id="new-competition"
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
                />
              </h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                  <button
                    className="btn btn-md btn-outline-success"
                    onClick={() => this.launch()}>
                    Launch
                  </button>
                  <button className="btn btn-md btn-outline-secondary">
                    History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="new-description" className="row">
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

        <div id="new-data-description" className="row">
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

        <div id="new-data-sources" className="row mb-2">
          <div className="col-md-6">
            <div className="card mb-4 shadow-sm">
              <div className="card-header">Data Sources</div>
              <div className="card-body d-flex flex-column align-items-start">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 fileList">
                      {this.renderFileList('dataSources', dataSourcesFile)}
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
                      {this.renderFileList('solution', solutionFile)}
                    </div>
                    <div className="col-md-6">
                      <div className="dropzone">
                        <Dropzone
                          activeClassName="success"
                          onDrop={this.onDropSolution}
                          multiple={false}>
                          <i className="fas fa-upload fa-5x" />
                          <p className="filename">Upload Solution</p>
                        </Dropzone>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="section">
            {renderHTML(
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            )}
          </div> */}
      </div>
    )
  }
}

export default NewCompetition
