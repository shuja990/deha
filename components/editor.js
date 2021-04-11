
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class Edit extends React.Component {
    state = {
        content: []
    }
  handleEditorChange = (e) => {
    this.props.setContent(e.target.getContent())
  }

  render() {
    return (
      <Editor
        apiKey="c5lvi6x844sdyag3i8eozo1910j9fr19ln1l95kny9dtkk2p"
        initialValue="<p>Initial content</p>"
        init={{
          height: 500,
          menubar: "insert",
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          image_list: [],
          toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | image | help | colour'
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default Edit;