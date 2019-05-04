import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  fetchPost, deletePost, updatePost, addComment, deleteComment,
} from '../actions';

import EditPost from '../components/edit-post';
import ViewPost from '../components/view-post';
import Comment from '../components/comment';
import AddComment from '../components/add-comment';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  toggleEditMode = () => {
    const { isEditing } = this.state;

    this.setState({
      isEditing: !isEditing,
    });
  }

  updatePost = (post) => {
    this.props.updatePost(this.props.post._id, post);

    this.setState({
      isEditing: false,
    });
  }

  renderComments = (comments) => {
    if (comments) {
      return comments.map((comment) => {
        return <Comment item={comment} key={comment.timestring} deleteComment={this.deleteComment} />;
      });
    } else return null;
  }

  addComment = (comment) => {
    this.props.addComment(this.props.post.id, comment);
  }

  deleteComment = (comment) => {
    this.props.deleteComment(this.props.post.id, comment);
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <div className="view-post" id="error-message">
          <h1>Uh oh! Looks like there was an error with the API...</h1>
          <p>{this.props.errorMessage}</p>
        </div>
      );
    } else if (this.state.isEditing) {
      return (
        <div className="view-post">
          <EditPost post={this.props.post} updatePost={this.updatePost} history={this.props.history} />
        </div>
      );
    } else {
      return (
        <div className="view-post">
          <ViewPost post={this.props.post} deletePost={this.props.deletePost} toggleEditMode={this.toggleEditMode} history={this.props.history} />
          <div className="bottom">
            <div className="line" />

            <div>
              <div className="commentsArea">
                <h2>Comments:</h2>
                {this.renderComments(this.props.post.comments)}
                <AddComment addComment={this.addComment} />
              </div>
              <div className="line" />
            </div>

            <div id="buttons">
              {/* adopted from: https://codesandbox.io/s/9yp4yk6qno */}
              <Fab color="secondary" aria-label="Edit" onClick={this.toggleEditMode} className="fab">
                <Icon><i className="fas fa-pen" /></Icon>
              </Fab>
              <Fab aria-label="Delete" onClick={() => { this.props.deletePost(this.props.post._id, this.props.history); }} className="fab">
                <DeleteIcon />
              </Fab>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.current,
    errorMessage: state.posts.errorMessage,
  };
};

export default withRouter(connect(mapStateToProps, {
  fetchPost, deletePost, updatePost, addComment, deleteComment,
})(Post));
