import React from 'react';

const Comment = (props) => {
  return (
    <div className="comment">
      <p className="comment-text">{props.item.comment}</p>
      <p className="timestring">{new Date(props.item.timestring).toDateString()}</p>
      <p className="delete-comment" onClick={() => { props.deleteComment(props.item); }}>Delete Comment</p>
    </div>
  );
};

export default Comment;
