import React from 'react';
import marked from 'marked';

const ViewNote = (props) => {
  if (props.post.title) {
    return (
      <div className="content">
        <h1>{props.post.title}</h1>
        <h3>{props.post.tags.join(' ')}</h3>
        <h5>{`${props.post.author.username} | ${new Date(props.post.timestamp).toDateString()}`}</h5>
        <div id="display-content" dangerouslySetInnerHTML={{ __html: marked(props.post.content || '') }} />
      </div>
    );
  } else {
    return null;
  }
};

export default ViewNote;
