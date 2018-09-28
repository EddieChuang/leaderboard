import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

export default {
  /**
   * extract raw string text from editor content
   * @param {EditorState} editorState the current editor state
   */
  getRawText: editorState => {
    return convertToRaw(editorState.getCurrentContent()).blocks[0].text
  },

  /**
   * extract HTML string from editor content
   * @param {EditorState} editorState the current editor state
   */
  getHTML: editorState => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
}
