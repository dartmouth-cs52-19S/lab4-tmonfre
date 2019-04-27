import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      isEditing: false,
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  render() {
    return (
      <div>
        <h1>{this.props.post.title}</h1>
        <h3>{this.props.post.tags}</h3>
        <img src={this.props.post.cover_url} alt={this.props.post.title} />
        <p>{this.props.post.content}</p>
        <br />
        <button onClick={() => { this.props.deletePost(this.props.post._id, this.props.history); }} type="submit">Delete Post</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.current,
  };
};

export default withRouter(connect(mapStateToProps, { fetchPost, deletePost })(Post));
