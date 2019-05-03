import React from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class EditPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.post.title,
      tags: this.props.post.tags.join(' '),
      content: this.props.post.content,
      cover_url: this.props.post.cover_url,
    };
  }

  updatePost = () => {
    if (this.state.title.length === 0 || this.state.tags.length === 0 || this.state.content.length === 0 || this.state.cover_url.length === 0) {
      toast.info('You haven\'t filled out all the fields');
    } else {
      this.props.updatePost({
        title: this.state.title,
        tags: this.state.tags.split(/[ ,]+/),
        content: this.state.content,
        cover_url: this.state.cover_url,
      });
    }
  }

  render() {
    return (
      <div>
        <div id="edit" className="content">
          <h3>Title</h3>
          <input type="text" value={this.state.title} onChange={(event) => { this.setState({ title: event.target.value }); }} />

          <h3>Tags</h3>
          <input type="text" value={this.state.tags} onChange={(event) => { this.setState({ tags: event.target.value }); }} />

          <h3>Content</h3>
          <textarea name="content" rows="1" value={this.state.content} onChange={(event) => { this.setState({ content: event.currentTarget.value }); }} />

          <h3>Cover URL</h3>
          <input type="text" value={this.state.cover_url} onChange={(event) => { this.setState({ cover_url: event.target.value }); }} />
        </div>
        <div className="bottom">
          <div className="line" />
          <div id="buttons">
            {/* adopted from: https://codesandbox.io/s/9yp4yk6qno */}
            <Fab color="secondary" aria-label="Complete" onClick={this.updatePost} className="fab">
              <Icon><i className="fas fa-check" /></Icon>
            </Fab>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
