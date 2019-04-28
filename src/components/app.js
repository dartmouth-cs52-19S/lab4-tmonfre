import React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import Posts from '../containers/posts';
import NewPost from '../containers/new-post';
import Post from '../containers/post';


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
  typography: {
    useNextVariants: true,
  },
});


const Nav = (props) => {
  return (
    <div>
      <nav>
        <NavLink to="/"><h1>React/Redux Blog</h1></NavLink>
        <NavLink to="/posts/new">
          <MuiThemeProvider theme={theme}>
            <Fab color="primary" aria-label="Add" className="fab" size="medium">
              <AddIcon />
            </Fab>
          </MuiThemeProvider>
        </NavLink>
      </nav>
      <div id="nav-line" />
    </div>
  );
};

const FallBack = () => {
  return <div>URL not found</div>;
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/posts/new" component={NewPost} />
            <Route path="/posts/:postID" component={Post} />
            <Route component={FallBack} />
          </Switch>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
