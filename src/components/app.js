import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import NavBar from '../containers/nav-bar';
import Posts from '../containers/posts';
import NewPost from '../containers/new-post';
import Post from '../containers/post';
import SignIn from '../containers/sign-in';
import SignUp from '../containers/sign-up';
import requireAuth from '../containers/require-auth';

const FallBack = () => {
  return <div>URL not found</div>;
};

const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/posts/new" component={requireAuth(NewPost)} />
            <Route path="/posts/:postID" component={Post} />
            <Route component={FallBack} />
          </Switch>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
