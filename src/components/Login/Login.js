import React, {Component} from 'react';
import { validateUser, getAllFavorites } from '../../api.js';
import { connect } from 'react-redux';
import { activeUserAction, addFavoriteAction } from '../../actions/actionIndex';
import SignUp from '../SignUp/SignUp';
import PropTypes from 'prop-types';
import './Login.css';

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      errorStatus: false
    }
  }

  handleChange=(e)=> {
    const { name, value } = e.target;
    this.setState({[name]:value});
  }

  handleLoginAttempt = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const validate = await validateUser(username, password);

    if (validate.status === 'success') {
      this.props.handleLogin(validate.data);
      this.getFavorites(validate.data);
      this.setState({username: '', password: ''});
    } else {
      this.setState({errorStatus: true});
    }
  }



  getFavorites = async (user) => {
    const allFavs = await getAllFavorites(user.id);
    this.props.addFavorite(allFavs.data);
  }

  render() {
    return (
      <div className="Login">
        <h3 className="login-prompt">Already Have An Account? Login Here:</h3>
        <form type="submit" className="login-form">
          <input
            className={!this.state.errorStatus ? "" : "error"}
            name="username"
            type='text'
            placeholder="E-mail"
            value={this.state.username}
            onChange={this.handleChange}
            />
          <input
            className={!this.state.errorStatus ? "" : "error"}
            name="password"
            type='password'
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            />
          <button
            className="login-btn"
            onClick={this.handleLoginAttempt}
            type="submit">Login
          </button>
          {this.state.errorStatus && 
            <span className="login-error">E-mail or password do not match, try again</span>
          }
        </form>

        <SignUp />
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  activeUser: state.activeUser,
});

export const mapDispatchToProps = (dispatch) => ({
  handleLogin: (user) => dispatch(activeUserAction(user)),
  addFavorite: (favoriteData) => dispatch(addFavoriteAction(favoriteData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  addFavorite: PropTypes.func,
  handleLogin: PropTypes.func,
}
