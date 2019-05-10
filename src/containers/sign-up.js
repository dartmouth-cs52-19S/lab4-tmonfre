import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import { signupUser } from '../actions';
import 'react-toastify/dist/ReactToastify.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }

  signUp = () => {
    if (this.state.email.length > 0 && this.state.password.length > 0 && this.state.passwordConfirm.length > 0) {
      if (this.state.password === this.state.passwordConfirm) {
        if (this.state.password.length >= 8) {
          if (this.checkEmailFormat(this.state.email)) {
            this.props.signupUser(this.state, this.props.history);
          } else {
            toast.error('Email not properly formatted');
          }
        } else {
          toast.error('Passwords must be at least 8 characters long');
        }
      } else {
        toast.error('Passwords don\'t match');
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
      <div id="sign-up">
        <h2>Create An Account</h2>
        <div id="add" className="content">
          <h3>Email</h3>
          <input type="text" value={this.state.email} onChange={(event) => { this.setState({ email: event.target.value }); }} />

          <h3>Password</h3>
          <input type="password" value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }); }} />

          <h3>Confirm Password</h3>
          <input type="password" value={this.state.passwordConfirm} onChange={(event) => { this.setState({ passwordConfirm: event.target.value }); }} />
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
              onClick={this.signUp}
            >
            Sign Up
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
export default withRouter(connect(null, { signupUser })(SignUp));
