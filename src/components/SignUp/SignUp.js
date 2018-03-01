import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activeUserAction } from '../../actions/actionIndex';
import { validateUser } from '../../api.js';
import { signUpUser, getAllUsers } from '../../api.js';
import PropTypes from 'prop-types';
import './SignUp.css';

export class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password:'',
      errorStatus: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({[name]:value})
  }

  handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const allUsers = await getAllUsers();
    const userExists = await allUsers.find(user => user.email === email);

    if (userExists) {
      this.emailTaken(true);
    } else {
      await signUpUser(email, password, name)
      const validate = await validateUser(name, password);

      this.props.handleLogin(validate.data)
    }

    return userExists
  }

  emailTaken = (warning) => {
    warning ?
      this.setState({errorStatus: true}) : this.setState({errorStatus: false})
  }

  render () {
    return (
      <div className="signup">
        <h3 className="signup-prompt">New to MovieTracker? Sign-up for an account here:</h3>
        <form type="submit" className="signup-form">
          <input
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
            type="text"
            placeholder="Enter your name"
          />
          <input
            className={!this.state.errorStatus ? "" : "error"}
            value={this.state.email}
            onChange={this.handleChange}
            name="email"
            type="text"
            placeholder="Enter Email"
          />
          <input
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <button
            className="signup-btn"
            type="submit"
            onClick={this.handleSignUp}>
            Sign Up
          </button>
        </form>

       { this.state.errorStatus &&
        <p className="login-error">Sorry, an account with this e-mail already exists</p>
       }
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  handleLogin: (user) => dispatch(activeUserAction(user)),
})

export default connect(null, mapDispatchToProps)(SignUp);

SignUp.propTypes = {
  handleLogin: PropTypes.func.isRequired
}