import React from 'react';

const Comment = (props) => {
  return (
    <div className="comment">
      <p className="comment-text">{props.item.text}</p>
      <p className="timestring">{new Date(props.item.timestamp).toDateString()}</p>
      <div>
        <span className="delete-comment">{props.item.username}</span>
        {props.author === props.item.username ? <span className="delete-comment" onClick={() => { props.deleteComment(props.item); }}>| Delete Comment</span> : null}
      </div>
    </div>
  );
};

export default Comment;
