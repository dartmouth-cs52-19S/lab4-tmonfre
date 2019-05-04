import React from 'react';

export default class AddComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
    };
  }

  addComment = () => {
    this.props.addComment(this.state.comment);
    this.setState({
      comment: '',
    });
  }

  render() {
    return (
      <div className="add-comment">
        <h3>Add Comment</h3>
        <input value={this.state.comment} onChange={(e) => { this.setState({ comment: e.target.value }); }} />
        <br />
        <button type="button" onClick={this.addComment}>Add Comment</button>
      </div>
    );
  }
}
