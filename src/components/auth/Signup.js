import { Link } from 'react-router-dom'; 
import React, { Component } from 'react';
import authService from "./auth-service";

class Signup extends Component {

  state = { email: '', password: '' }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
   
    authService.signup(email, password)
    .then(createdUser => {
        this.setState({
            email: "",
            password: "",
        });
        this.props.getUser(createdUser, true);
    })
    .catch(error => console.log(error))
  }
   
  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
        <p>SIGNUP</p>
          <label>
          Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
   
          <label>
          Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
   
          <button type="submit"> Signup </button>
        </form>
   
        <p>
          Already have an account?
          <Link to={"/"}> Login</Link>
        </p>
   
      </div>
    )
  }
}

export default Signup;
