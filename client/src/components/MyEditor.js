import React, { useState, useMemo } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";

const MyEditor =({setFormData, formData}) =>  {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleChange = (data) => {
    setEditorState(data);
  };
  var htmlData = useMemo(
    () => draftToHtml(convertToRaw(editorState.getCurrentContent())),
    [editorState]
  );

  const toolbarOptions = {
    options: ["inline",
              // 'fontSize',
              // "emoji",
              'list'],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough"],
    },
    fontSize: {
      
      options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    }
  };
// console.log(htmlData)
  return (
    <StyledTxt className="app">
      <Editor
        id="review"
        onChange={(e) => { console.log(e)
          setFormData({...formData, "review" : htmlData})
        }}
        editorState={editorState}
        onEditorStateChange={handleChange}
        wrapperClassName="editor-wrapper"
        editorClassName="message-editor"
        toolbarClassName="message-toolbar"
        toolbar={toolbarOptions}
      />
      {/* <div className="html-output">{htmlData}</div> */}
    </StyledTxt>
  );
}

const StyledTxt = styled.div`
  .app {
  display: flex;
  flex-direction: column;
  padding: 10% 25%;
  margin-top: 20px;
  gap: 30px;
}
.editor-wrapper {
  border: 1px solid #c4cdd5;
  width:500px;
}
.message-toolbar {
  border-bottom: 1px solid #c4cdd5;
  margin-bottom: 0px;
  padding: 6px 5px;
}
.message-editor {
  height: 150px;
  font-size: 16px;
  padding: 0px 10px;
}
.rdw-option-wrapper {
  min-width: 35px;
  height: 30px;
}
.html-output {
  border: 1px solid silver;
  padding: 20px;
  background-color: #fafafa;
}
`
export default MyEditor;