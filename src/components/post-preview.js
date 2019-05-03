import React from 'react';
import { Link } from 'react-router-dom';

const PostPreview = (props) => {
  return (
    <Link to={`/posts/${props.post.id}`}>
      <div className="post-preview">
        <img src={props.post.cover_url} alt={props.post.title} />
        <div className="text-preview-section">
          <h3>{props.post.title}</h3>
          <p>{props.post.tags.join(' ')}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostPreview;
