import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    if (this.state.title.length === 0 || this.state.tags.length === 0 || this.state.content.length === 0 || this.state.cover_url.length === 0) {
      toast.info('You haven\'t filled out all the fields');
    } else {
      this.props.createPost({
        title: this.state.title,
        tags: this.state.tags.split(/[ ,]+/),
        content: this.state.content,
        cover_url: this.state.cover_url,
      }, this.props.history);
    }
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <div className="view-post" id="error-message">
          <h1>Uh oh! Looks like there was an error with the API...</h1>
          <p>{this.props.errorMessage}</p>
        </div>
      );
    } else {
      return (
        <div className="view-post">
          <div id="add" className="content">
            <h3>Title</h3>
            <input type="text" value={this.state.title} onChange={(event) => { this.setState({ title: event.target.value }); }} />

            <h3>Tags</h3>
            <input type="text" value={this.state.tags} onChange={(event) => { this.setState({ tags: event.target.value }); }} />

            <h3>Content</h3>
            <textarea name="content" value={this.state.content} onChange={(event) => { this.setState({ content: event.target.value }); }} />

            <h3>Cover URL</h3>
            <input type="text" value={this.state.cover_url} onChange={(event) => { this.setState({ cover_url: event.target.value }); }} />
          </div>
          <div className="bottom">
            <div className="line" />
            <div id="buttons">
              {/* adopted from: https://codesandbox.io/s/9yp4yk6qno */}
              <Fab color="secondary" aria-label="Complete" onClick={this.addPost} className="fab">
                <Icon><i className="fas fa-check" /></Icon>
              </Fab>
            </div>
          </div>
          <ToastContainer />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.posts.errorMessage,
  };
};

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, { createPost })(NewPost));
