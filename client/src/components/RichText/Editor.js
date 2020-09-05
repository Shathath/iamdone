import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import "../../styles/editor.css"

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];
const text = 'The';

export default class SimpleStaticToolbarEditor extends Component {
    constructor(props){
        super(props)
        this.state = {
            editorState: createEditorStateWithText(text),
          };
    }
  


  onChange = (editorState) => {
      this.setState({
           editorState
      },()=>{
        this.props.onChange(editorState)
      })
    //
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
      console.log( this.state.editorState.getCurrentContent().getPlainText())
    return (
      <div>
        <div style={{"boxSizing": "border-box",
                    "border": "1px solid #ddd",
                    "cursor": "text",
                    "padding": "16px",
                    "borderRadius": "2px",
                    "marginBottom": "2em",
                    
                    "background": "#fefefe"}}
        onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <Toolbar />
        </div>
      </div>
    );
  }
}