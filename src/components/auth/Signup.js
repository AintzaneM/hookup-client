import { Link } from 'react-router-dom'; 
import React, { Component } from 'react';
import authService from "./auth-service";

class Signup extends Component {

  state = { email: '', password: '', errorMsg: ''}

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
   
    authService.signup(email, password)
    .then(createdUser => {
        this.setState({
            email: "",
            password: "",
            errorMsg: "",
        });
        this.props.getUser(createdUser, true);
    })
    .catch((error) => {
      this.setState({
       errorMsg:
         "Password needs to have at least 8 characters (at least one number, one lowercase and one uppercase letter.) </br> Username must be unique.",
     });
     console.log(error);
    });
  }
   
  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
        {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
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
