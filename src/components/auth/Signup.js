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
      <div className="form-signup">
        <form onSubmit={this.handleFormSubmit}>
        {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
        <div className="input-container-signup">
          <p className="title-signup">Welcome!  <br />Let's create your account!</p>
            <label>
            Email
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="you@email.com" 
              />
            </label>
            <label>
            Password
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="********" 
              />
            </label>
    
          <button type="submit"><strong> Signup </strong> </button>
          </div>
        </form>
   
        <p>
          Already have an account?
          <Link to={"/login"}> Login</Link>
        </p>
   
      </div>
    )
  }
}

export default Signup;
