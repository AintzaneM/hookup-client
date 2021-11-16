import React, { Component } from 'react';
import authService from './auth-service';
import { Link } from 'react-router-dom';
 
class Login extends Component {
  state = { email: '', password: '' , errorMsg: ''};
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
 
    authService
      .login(email, password)
      .then(response => {
        this.setState({ email: '', password: '', errorMsg:"" });
        this.props.getUser(response, true);
      })
        .catch((errorMsg) => {
          this.setState({
           errorMsg:
             "The login didn't work. You should type your right credentials. Try again"
         });
        });
  };
 
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
 
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
      
          {<p>{this.state.errorMsg}</p>}
          
          <p>LOGIN</p>
          <label>
            Email:
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
 
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>

          <button type="submit"> Login </button>
        </form>
 
        <p>
          Don't have account?
          <Link to={'/signup'}> Signup</Link>
        </p>
      </div>
    );
  }
}
 
export default Login;