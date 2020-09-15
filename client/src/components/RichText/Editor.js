// import React, { Component } from 'react';
// import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
// import createToolbarPlugin ,{Separator} from 'draft-js-static-toolbar-plugin';
// import {
//     ItalicButton,
//     BoldButton,
//     UnderlineButton,
//     CodeButton,
//     HeadlineOneButton,
//     HeadlineTwoButton,
//     HeadlineThreeButton,
//     UnorderedListButton,
//     OrderedListButton,
//     BlockquoteButton,
//     CodeBlockButton,
//   } from 'draft-js-buttons'
// import "../../styles/editor.css"

// const staticToolbarPlugin = createToolbarPlugin();
// const { Toolbar } = staticToolbarPlugin;
// const plugins = [staticToolbarPlugin];
// const text = 'The';

// export default class SimpleStaticToolbarEditor extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             editorState: createEditorStateWithText(text),
//           };
//     }
  


//   onChange = (editorState) => {
//       this.setState({
//            editorState
//       },()=>{
//         this.props.onChange(editorState)
//       })
//     //
//   };

//   focus = () => {
//     this.editor.focus();
//   };

//   render() {
      
//     return (
//       <div>
//         <div style={{"boxSizing": "border-box",
//                     "border": "1px solid #ddd",
//                     "cursor": "text",
//                     "padding": "16px",
//                     "borderRadius": "2px",
//                     "marginBottom": "2em",
                    
//                     "background": "#fefefe"}}
//         onClick={this.focus}>
//             <Toolbar >
//                 <ItalicButton />
//                 <BoldButton />
//             </Toolbar>
//           <Editor
//             editorState={this.state.editorState}
//             onChange={this.onChange}
//             plugins={plugins}
//             ref={(element) => { this.editor = element; }}
//           />
          
//         </div>
//       </div>
//     );
//   }
// }


import React, { Component } from 'react';

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import "../../styles/editor.css"
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';



class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => // eslint-disable-next-line
          <Button key={i} {...this.props} />
        )}
      </div>
    );
  }
}



const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];
const text = 'In this editor a toolbar shows up once you select part of the text …';

export default class CustomToolbarEditor extends Component {

  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    },()=>{
        
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div onClick={this.focus}>
        <Toolbar>
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <CodeButton {...externalProps} />
                  <Separator {...externalProps} />
                  
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  <CodeBlockButton {...externalProps} />
                </div>
              )
            }
          </Toolbar>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          
        </div>
      </div>
    );
  }
}