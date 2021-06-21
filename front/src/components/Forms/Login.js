import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';

import {URL} from '../../api'

import FormInput from './FormInput';
import Success from './Success';

class Login extends Component {
  state = {
    success: false
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.setState({error: ''});

    const userData = {
      username: username,
      password: password
    };

    axios.post(`${URL}/users/authenticate`, userData).then(res => {
        const token = res.data.token;
        if(token) {

          this.setState({success: true});
          setTimeout(() => {
              this.props.history.push('/mode');
          }, 1500);
        }
      })
      .catch(err => {
        this.setState({error : "User Not found"});
      });
  }

  attrChangeUn = (username) => {
    this.setState({username});
  }

  attrChangePwd = (password) => {
    this.setState({password});
  }

  componentDidMount = () => {
    this.FormInput.focus();
  }

  render() {
    const { error, success, username, password } = this.state;
    return(
      <div className='login'>
        <div className='popup'>
          <div className='header'>Welcome Back</div>
          <div className='content'>
            { success ?
            <Success /> :
            <form action="/api/login" method="post" id='login-form'>

              <FormInput
                type='text'
                name='username'
                ref={comp => {this.FormInput = comp;}}
                onChange={ this.attrChangeUn }
                 />

              <FormInput
                type='password'
                name='password'
                onChange={ this.attrChangePwd }
                />

              <p className='error-msg'>{error}</p>

              <input
                type='submit'
                value='Login'
                className='btn btn-form'
                disabled={!(username && password)}
                onClick={this.handleLogin}
                />

              <p>Need an account? <Link to="/signup">Sign up</Link></p>
            </form>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
