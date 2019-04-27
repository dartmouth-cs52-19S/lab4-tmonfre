import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPosts } from '../actions';

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
    return (
      <div className="post-preview-area">
        {this.renderPreviews()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.all,
  };
};

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
