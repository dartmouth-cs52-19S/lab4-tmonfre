import React from 'react';
import marked from 'marked';

const ViewNote = (props) => {
  return (
    <div className="content">
      <h1>{props.post.title}</h1>
      <h3>{props.post.tags}</h3>
      <div id="display-content" dangerouslySetInnerHTML={{ __html: marked(props.post.content || '') }} />
    </div>
  );
};

export default ViewNote;
