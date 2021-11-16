import './App.css';
import { Route, Switch } from 'react-router-dom';
import SkillList from './components/skills/SkillList';
import Homepage from './components/Homepage';
import Navbar from './components/navbar/Navbar';
import React from 'react';
import Login from "./components/auth/Login";
import Signup from './components/auth/Signup';
import authService from './components/auth/auth-service';
import SkillsDetails from './components/skills/SkillDetails';
import ExperienceDetails from './components/experiences/ExperienceDetails';
import ProtectedRoute from './components/auth/ProtectedRoute';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null
  };

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn
    });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then(data => {
          if (data) {
            this.setState({
              user: data,
              isLoggedIn: true
            });
          } else {
            this.setState({
              user: null,
              isLoggedIn: false
            });
          }
        })
        .catch(err => {
          this.setState({
            user: null,
            isLoggedIn: false
          });
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} />

        <Switch>
          <Route exact path="/"  >
            <Homepage />
          </Route>
          <Route exact path="/signup" render={props => <Signup {...props} getUser={this.getTheUser} />} />
          <Route exact path="/login" render={props => <Login {...props} getUser={this.getTheUser} />} />

          <ProtectedRoute user={this.state.user} userIsLoggedIn={this.state.isLoggedIn} exact path="/skills" component= {SkillList}/>
          <Route user={this.state.user} userIsLoggedIn={this.state.isLoggedIn} exact path="/skills/:id" component={SkillsDetails}/>
          <Route exact path="/skills/:id/experiences/:experienceId" render={props=> <ExperienceDetails {...props} user={this.state.user}/>}/>

        </Switch>

      </div>
    );

  }







}

export default App;
