import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../auth/auth-service';
 
class Navbar extends React.Component {

  logoutUser = () => {
    authService.logout().then(() => {
      this.props.getUser(null, false);
    });
  };
 
  
  // return (
  //   <nav className="nav-style">
  //     <ul>
  //       <li><Link to="/projects" style={{ textDecoration: 'none' }}>Projects</Link></li>
  //   </ul>
  //   </nav>
  // )

  render() {
    const { userIsLoggedIn, userData } = this.props;
 
    if (userIsLoggedIn) {
      return (
        <nav className="nav-style">
          <ul>
            {userIsLoggedIn && <li>Welcome, {userData.email}</li>}
            <li>
              <Link to="/" style={{ textDecoration: 'none' }}>
                Homepage
              </Link>
            </li>
            <li>
              <Link to="/skills" style={{ textDecoration: 'none' }}>
                Skills
              </Link>
            </li>
            <li>
              <Link to="/">
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <div>
          <nav className="nav-style">
            <ul>
              <li>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  Login:):)
                </Link>
              </li>
              <li>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  Signup
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}
 


 
export default Navbar;