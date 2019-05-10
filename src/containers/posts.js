import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { fetchPosts, clearErrorMessage } from '../actions';
import PostPreview from '../components/post-preview';

class Posts extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPreviews = () => {
    return this.props.posts.map((post) => {
      return <PostPreview post={post} key={post.id} />;
    });
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <div className="view-post" id="error-message">
          <h1>Uh oh! Looks like there was an error with the API...</h1>
          <p>{this.props.errorMessage}</p>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="clear-error-button"
            onClick={this.props.clearErrorMessage}
          >
            Clear Error
          </Button>
        </div>
      );
    } else {
      return (
        <div className="post-preview-area">
          {this.renderPreviews()}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.all,
    errorMessage: state.posts.errorMessage,
  };
};

export default withRouter(connect(mapStateToProps, { fetchPosts, clearErrorMessage })(Posts));
