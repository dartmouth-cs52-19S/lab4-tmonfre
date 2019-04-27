import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createPost } from '../actions';

class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: '',
      content: '',
      cover_url: '',
    };
  }

  addPost = () => {
    this.props.createPost({
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
      cover_url: this.state.cover_url,
    }, this.props.history);
  }

  render() {
    return (
      <div className="create-post">
        <p>Title</p>
        <input type="text" value={this.state.title} onChange={(event) => { this.setState({ title: event.target.value }); }} />

        <p>Tags</p>
        <input type="text" value={this.state.tags} onChange={(event) => { this.setState({ tags: event.target.value }); }} />

        <p>Content</p>
        <input type="text" value={this.state.content} onChange={(event) => { this.setState({ content: event.target.value }); }} />

        <p>Cover URL</p>
        <input type="text" value={this.state.cover_url} onChange={(event) => { this.setState({ cover_url: event.target.value }); }} />

        <br />
        <button onClick={this.addPost} type="submit">Create Post</button>
      </div>
    );
  }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { createPost })(NewPost));
