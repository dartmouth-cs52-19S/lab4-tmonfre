import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import { signinUser } from '../actions';
import 'react-toastify/dist/ReactToastify.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  signIn = () => {
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      if (this.checkEmailFormat(this.state.email)) {
        this.props.signinUser(this.state, this.props.history);
      } else {
        toast.error('Email not properly formatted');
      }
    } else {
      toast.warn('Please fill out all the fields');
    }
  }

  // taken from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  checkEmailFormat = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    return (
      <div id="sign-in">
        <div id="add" className="content">
          <h2>Sign In</h2>
          <h3>Email</h3>
          <input type="text" value={this.state.email} onChange={(event) => { this.setState({ email: event.target.value }); }} />

          <h3>Password</h3>
          <input type="password" value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }); }} />
        </div>
        <div className="bottom">
          <div className="line" />
          <div id="buttons">
            {/* adopted from: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/page-layout-examples/sign-in/SignIn.js */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="sign-in-button"
              onClick={this.signIn}
            >
            Sign In
            </Button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { signinUser })(SignIn));
