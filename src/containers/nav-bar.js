import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { signoutUser } from '../actions';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
  typography: {
    useNextVariants: true,
  },
});

const NavBar = (props) => {
  const renderLinks = () => {
    if (!props.authenticated) {
      return (
        <div id="auth-links">
          <NavLink to="/signin"><h3>Sign In</h3></NavLink>
          <NavLink to="/signup"><h3>Create An Account</h3></NavLink>
        </div>
      );
    } else {
      return (
        <div id="auth-links">
          <h4>{`Welcome ${props.userData.username}!`}</h4>
          <h3 onClick={() => { props.signoutUser(props.history); }}>Sign Out</h3>
        </div>
      );
    }
  };

  return (
    <div>
      <nav>
        <div id="nav-left">
          <NavLink to="/"><h1>React/Redux Blog</h1></NavLink>
        </div>
        <div id="nav-right">
          {renderLinks()}
          <NavLink to="/posts/new">
            <MuiThemeProvider theme={theme}>
              <Fab color="primary" aria-label="Add" className="fab" size="medium">
                <AddIcon />
              </Fab>
            </MuiThemeProvider>
          </NavLink>
        </div>
      </nav>
      <div id="nav-line" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    userData: state.auth.userData,
  };
};

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));
